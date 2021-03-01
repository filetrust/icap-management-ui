import { stub, SinonStub } from "sinon";
import winston from "winston";
import axios, { CancelToken } from "axios";

import IdentityManagementService from "./IdentityManagementService";
import IdentityManagementApi from "../../../common/http/IdentityManagementApi/IdentityManagementApi";

// let cancellationToken: CancelToken;

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.cli()
		})
	]
});

describe("IdentityManagementService", () => {
	describe("constructor", () => {
		it("should_construct_with_valid_arguments", () => {
			// Act
			const identityManagementService = new IdentityManagementService(logger);

			// Assert
			expect(identityManagementService.logger).toEqual(logger);
		});
	});
});