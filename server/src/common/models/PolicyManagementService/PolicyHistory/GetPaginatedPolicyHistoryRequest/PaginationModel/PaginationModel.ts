export default class PaginationModel {
    zeroBasedIndex: number;
    pageSize: 25 | 50 | 100;

    constructor(zeroBasedIndex: number, pageSize: 25 | 50 | 100) {
        this.zeroBasedIndex = zeroBasedIndex;
        this.pageSize = pageSize;
    }
}