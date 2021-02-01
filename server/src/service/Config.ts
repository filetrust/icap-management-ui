import IConfig from "../common/models/IConfig";

const Config = () => {
    const development: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: "https://localhost:1000/api/v1",
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: "https://localhost:2000/api/v1",
            getPolicyPath: "/policy",
            deletePolicyPath: "/policy",
            getDraftPolicyPath: "/policy/draft",
            saveDraftPolicyPath: "/policy/draft",
            getCurrentPolicyPath: "/policy/current",
            getPolicyHistoryPath: "/policy/history",
            publishPolicyPath: "/policy/publish",
            distributeAdaptionPolicyPath: "/policy/current/distribute-adaption",
            distributeNcfsPolicyPath: "/policy/current/distribute-ncfs"
        },
        identityManagement: {
            identityManagementServiceBaseUrl: "http://localhost:6004/api/v1",
            validateTokenPath: "/users/validate-token",
            authenticatePath: "/users/authenticate",
            newUserPath: "/users/new",
            forgotPasswordPath: "/users/forgot-password",
            validateResetTokenPath: "/users/validate-reset-token",
            resetPasswordPath: "/users/reset-password",
            getUsersPath: "/users",
            getUserPath: "/users",
            updateUserPath: "/users",
            deleteUserPath: "/users"
        }
    };

    const production: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: process.env.TRANSACTION_EVENT_API_URL,
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: process.env.POLICY_MANAGEMENT_API_URL,
            getPolicyPath: "/policy",
            deletePolicyPath: "/policy",
            getDraftPolicyPath: "/policy/draft",
            saveDraftPolicyPath: "/policy/draft",
            getCurrentPolicyPath: "/policy/current",
            getPolicyHistoryPath: "/policy/history",
            publishPolicyPath: "/policy/publish",
            distributeAdaptionPolicyPath: "/policy/current/distribute-adaption",
            distributeNcfsPolicyPath: "/policy/current/distribute-ncfs"
        },
        identityManagement: {
            identityManagementServiceBaseUrl: process.env.IDENTITY_MANAGEMENT_API_URL,
            validateTokenPath: "/users/validate-token",
            authenticatePath: "/users/authenticate",
            newUserPath: "/users/new",
            forgotPasswordPath: "/users/forgot-password",
            validateResetTokenPath: "/users/validate-reset-token",
            resetPasswordPath: "/users/reset-password",
            getUsersPath: "/users",
            getUserPath: "/users",
            updateUserPath: "/users",
            deleteUserPath: "/users"
        }
    };

    switch (process.env.NODE_ENV) {
        case "development":
            return development;
        case "production":
            return production;
    }
};

export default Config;
