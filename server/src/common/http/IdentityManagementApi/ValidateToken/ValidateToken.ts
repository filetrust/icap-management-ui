import axiosHelper from "../../../../common/helpers/AxiosHelper";
import IConfig from "../../../../common/models/IConfig";

export class Token {
    static validateToken = async (
        config: IConfig,
        token: string,
    ): Promise<boolean> => {
        const validateTokenUrl =
            config.identityManagement.identityManagementServiceBaseUrl +
            config.identityManagement.validateTokenPath;

        const response = await axiosHelper(validateTokenUrl, "POST", null, { token });

        return response.message === "Token is valid";
    }
}