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
        if (!totalProcessed) {
            throw new ArgumentNullException("totalProcessed");
        }
        this.totalProcessed = totalProcessed;

        if (!data) {
            throw new ArgumentNullException("data");
        }
        this.data = data;
    }
}