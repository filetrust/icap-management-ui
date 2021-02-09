import { ArgumentNullException } from "../../errors/errors";

export interface DataPoint {
    date: Date,
    processed: number,
    processedByOutcome: {
        failed: number,
        replace: number,
        unmodified: number
    },
    processedByNcfs: {
        blocked: number,
        relayed: number,
        replaced: number
    }
}

export class GetMetricsResponse {
    totalProcessed: number;
    data: DataPoint[]

    constructor(totalProcessed: number, data: DataPoint[]) {
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