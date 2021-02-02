export default interface IConfig {
    analytics: {
        getMetricsPath: string;
    }

    requestHistory: {
        transactionEventServiceBaseUrl: string;
        getTransactionsPath: string;
        getTransactionDetailsPath: string;
    }

    policy: {
        policyManagementServiceBaseUrl: string;
        getPolicyPath: string;
        deletePolicyPath: string;
        getDraftPolicyPath: string;
        saveDraftPolicyPath: string;
        getCurrentPolicyPath: string;
        getPolicyHistoryPath: string;
        publishPolicyPath: string;
        distributeAdaptionPolicyPath: string;
        distributeNcfsPolicyPath: string;
    }

    identityManagement: {
        identityManagementServiceBaseUrl: string;
        validateTokenPath: string;
        authenticatePath: string;
        newUserPath: string;
        forgotPasswordPath: string;
        validateResetTokenPath: string;
        resetPasswordPath: string;
        getUsersPath: string;
        getUserPath: string;
        updateUserPath: string;
        deleteUserPath: string;
    }
}