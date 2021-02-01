import { ArgumentNullException } from "../../errors/errors";

export class GetMetricsResponse {
    totalProcessed: number;
    data: [
        {
            date: Date,
            processed: number
        }
    ]

    constructor(totalProcessed: number, data: [{ date: Date, processed: number }]) {
        if (totalProcessed === null) {
            throw new ArgumentNullException("totalProcessed");
        }
        this.totalProcessed = totalProcessed;

        if (data === null) {
            throw new ArgumentNullException("data");
        }
        this.data = data;
    }
}