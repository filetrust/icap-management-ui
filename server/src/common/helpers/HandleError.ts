import { Logger } from "winston";

const handleError = (res: any, error: any, message: string, logger: Logger) => {
    if (error.response) {
        const errorResponse = error.response.data.message ?
            error.response.data.message :
            error.response.data;
        logger.error(errorResponse ? errorResponse : error.response.statusText);
        res.status(error.response.status).json(errorResponse);
    }
    else {
        logger.error(`${message} - ${error.stack ? error.stack : error}`);
        res.status(500).json(`${message} - ${error.message ? error.message : error}`);
    }
}

export default handleError;