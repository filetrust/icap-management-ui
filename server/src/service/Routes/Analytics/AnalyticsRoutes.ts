import { Express } from "express";
import { Logger } from "winston";
import axios from "axios";
import IConfig from "../../../common/models/IConfig";
import handleCancellation from "../../../common/helpers/HandleCancellation";
import TransactionEventService from "../../../business/services/TransactionEventService/TransactionEventService";
import { GetMetricsRequest } from "../../../common/models/TransactionEventService/GetMetrics/GetMetricsRequest";
import handleError from "../../../common/helpers/HandleError";

class AnalyticsRoutes {
    cancellationMessage: string = "Request Cancelled by the Client";

    transactionEventServiceBaseUrl: string;
    getMetricsPath: string;

    transactionEventService: TransactionEventService;

    app: Express;
    logger: Logger;

    constructor(config: IConfig, app: Express, logger: Logger) {
        this.transactionEventServiceBaseUrl = config.requestHistory.transactionEventServiceBaseUrl;
        this.getMetricsPath = config.analytics.getMetricsPath;
        this.transactionEventService = new TransactionEventService(logger);
        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        this.app.post("/analytics/metrics", async (req, res) => {
            const requestUrl = this.transactionEventServiceBaseUrl + this.getMetricsPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const getMetricsRequest = new GetMetricsRequest(
                    requestUrl, req.body.fromDate, req.body.toDate);

                const metrics = await this.transactionEventService.getMetrics(
                    getMetricsRequest, cancellationTokenSource.token);

                res.json(metrics);
            }
            catch (error) {
                handleError(
                    res,
                    error,
                    `Error Retrieving Metrics`,
                    this.logger);
            }
        })
    }
}