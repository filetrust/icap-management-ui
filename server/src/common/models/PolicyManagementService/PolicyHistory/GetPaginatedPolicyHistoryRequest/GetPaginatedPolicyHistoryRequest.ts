import { ArgumentNullException } from "../../../errors/errors";
import PaginationModel from "./PaginationModel/PaginationModel";

export class GetPaginatedPolicyHistoryRequest {
    url: string;
    pagination: PaginationModel;

    constructor (url: string, pagination: PaginationModel) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (pagination === null || undefined) {
            throw new ArgumentNullException("pagination");
        }
        this.pagination = pagination;
    }
}