import { ArgumentNullException } from "../../errors/errors";

export interface DataPoint {
    date: Date,
    processed: number,
    processedByOutcome: {
        Failed: number,
        Replace: number,
        Unmodified: number
    },
    processedByNcfs: {
        Blocked: number,
        Relayed: number,
        Replaced: number
    }
}

export class GetMetricsResponse {
    totalProcessed: number;
    totalSentToNcfs: number;
    data: DataPoint[]

    constructor(totalProcessed: number, totalSentToNcfs: number, data: DataPoint[]) {
        if (totalProcessed === null) {
            throw new ArgumentNullException("totalProcessed");
        }
        this.totalProcessed = totalProcessed;

        if (totalSentToNcfs === null) {
            throw new ArgumentNullException("totalProcessed");
        }
        this.totalSentToNcfs = totalSentToNcfs;

        if (data === null) {
            throw new ArgumentNullException("data");
        }
        this.data = data;
    }
}