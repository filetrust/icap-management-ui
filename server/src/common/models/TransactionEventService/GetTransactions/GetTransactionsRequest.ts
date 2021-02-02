import { Guid } from "guid-typescript";
import { FileType } from "../../enums/FileType";
import { Risk } from "../../enums/Risk";
import { ArgumentNullException } from "../../errors/errors";

export interface Filter {
    TimestampRangeStart: Date,
    TimestampRangeEnd: Date,
    Risks?: Risk[],
    FileTypes?: FileType[],
    FileIds?: Guid[],
    PolicyIds?: Guid[]
}

export class GetTransactionsRequest {
    url: string;
    body: { Filter: Filter };

    constructor(url: string, body: { Filter: Filter }) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (body === undefined || body === null || (Object.keys(body).length === 0 && body.constructor === Object)) {
            throw new ArgumentNullException("body");
        }
        this.body = body;
    }
}