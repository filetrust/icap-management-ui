import { Guid } from "guid-typescript";
import { FileType } from "../../enums/FileType";
import { Risk } from "../../enums/Risk";
import { ArgumentException, ArgumentNullException } from "../../errors/errors";
import TransactionFile from "../TransactionFile";

export class GetTransactionsResponse {
    count: number;
    files: TransactionFile[];

    constructor(count: number, files: any[]) {
        if (count > 0 && files.length < 1) {
            throw new ArgumentException("files", "Count was non-zero, but no files were found");
        }

        this.count = count;
        this.files = files.map((file) => {
            if (!file.timestamp) {
                throw new ArgumentNullException("file.timestamp");
            }

            if (!file.fileId) {
                throw new ArgumentNullException("file.fileId");
            }

            if (file.detectionFileType === undefined || file.detectionType === null) {
                throw new ArgumentNullException("file.detectionFileType");
            }

            if (file.risk === undefined || file.risk === null) {
                throw new ArgumentNullException("file.risk");
            }

            if (!file.activePolicyId) {
                throw new ArgumentNullException("file.activePolicyId");
            }

            if (!file.directory) {
                throw new ArgumentNullException("file.directory");
            }

            return new TransactionFile(
                new Date(file.timestamp),
                Guid.parse(file.fileId),
                file.detectionFileType as FileType,
                file.risk as Risk,
                Guid.parse(file.activePolicyId),
                file.directory
            )
        });
    }
}