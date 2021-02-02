import { ArgumentNullException } from "../../errors/errors";

export class GetMetricsRequest {
    url: string;
    fromDate: Date;
    toDate: Date;

    constructor(url: string, fromDate: Date, toDate: Date) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (!fromDate) {
            throw new ArgumentNullException("fromDate");
        }
        this.fromDate = fromDate;

        if (!toDate) {
            throw new ArgumentNullException("toDate");
        }
        this.toDate = toDate;
    }
}