import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import dotenv from "dotenv";
import setup from "./service/Setup";
import Config from "./service/Config";
import path from "path";
import cors from "cors";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { Token } from "./common/http/IdentityManagementApi/ValidateToken/ValidateToken";

declare module 'express-session' {
    export interface SessionData {
        [key: string]: any
    }
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine
        (
            winston.format.json(),
            winston.format.timestamp()
        ),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.cli(), winston.format.timestamp()),
        })],
});

logger.info("Starting Service: ICAP Management UI...");

dotenv.config();
logger.info("Loading Environment Variables with dotenv");

const port = 8080;
const workingDirectory = process.cwd();
const config = Config();
const app = express();
app.disable("x-powered-by");
app.use(express.static(`${workingDirectory}/frontend/build`));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
    const reactDevServerEndpoint = "http://localhost:3000";
    const corsOptions = { origin: reactDevServerEndpoint, credentials: true };
    app.use(cors(corsOptions));
    logger.info(`CORS Config added for REACT dev server - cross-origin source: ${reactDevServerEndpoint}`);
}

const sessionOptions = {
    genid() {
        return uuidv4() // use UUIDs for session IDs
    },
    secret: uuidv4(),
    cookie: { secure: false },
    resave: false,
    saveUninitialized: true
};


if (process.env.NODE_ENV === "production") {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(sessionOptions));

app.use(async (req, res, next) => {
    switch (req.path) {
        case "/login":
        case "/users/login":
        case "/users/forgot-password":
        case "/confirm":
        case "/reset":
        case "/users/reset":
        case "/users/validate-reset-token":
        case "/version":
            return next();
        default:
            logger.info(req.session.id + ": Validating current user...");

            try {
                if (!req.session.token) {
                    logger.info(req.session.id + ": Session Token missing");
                    return res.redirect("/login");
                }

                if (!await Token.validateToken(config, req.session.token)) {
                    return res.status(403).json({ message: "Session Token was Invalid" });
                }
            }
            catch (error) {
                return res.status(error.response.status).json({ message: error.response.data });
            }

            next();
    }
});

setup(config, app, logger);

app.get("/*", async (req, res) => {
    res.sendFile(path.join(`${workingDirectory}/frontend/build/index.html`));
});

const server = app.listen(port, () => {
    logger.info("Started Service: ICAP Management UI");

    if (process.env.NODE_ENV === "development") {
        logger.info(`env: ${process.env.NODE_ENV}`);
        logger.info(`Listening on http://localhost:${port}`);
    }

    if (process.env.NODE_ENV === "production") {
        logger.info(`Logs: ${path.join(workingDirectory, "/error.log")} && ` +
            `${path.join(workingDirectory, "/combined.log")}`);
    }
});

module.exports.server = server;