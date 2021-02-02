import { Request } from "express";
import { CancelTokenSource } from "axios";
import { Logger } from "winston";

const handleCancellation = (
    req: Request,
    cancellationTokenSource: CancelTokenSource,
    message: string,
    logger?: Logger) => {

    req.connection.on("close", () => {
        try {
            cancellationTokenSource.cancel(message);
        }
        catch (error) {
            if (logger) {
                logger.info(message);
            }
        }
    });
}

export default handleCancellation;