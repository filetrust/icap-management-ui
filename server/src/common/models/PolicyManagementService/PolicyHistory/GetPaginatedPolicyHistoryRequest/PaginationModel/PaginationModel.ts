import { ArgumentException } from "../../../../errors/errors";

export default class PaginationModel {
    zeroBasedIndex: number;
    pageSize: 25 | 50 | 100;

    constructor(zeroBasedIndex: number, pageSize: 25 | 50 | 100) {
        if (zeroBasedIndex < 1) {
            throw new ArgumentException("zeroBasedIndex", "Cannot be less than 1");
        }
        this.zeroBasedIndex = zeroBasedIndex;
        this.pageSize = pageSize;
    }
}