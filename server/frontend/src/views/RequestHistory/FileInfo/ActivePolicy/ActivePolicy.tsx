import React from "react";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export interface ActivePolicyProps {
    policy: Policy
}

const ActivePolicy = (props: ActivePolicyProps) => {
    return (
        <div>{props.policy.id}</div>
    );
}

export default ActivePolicy;