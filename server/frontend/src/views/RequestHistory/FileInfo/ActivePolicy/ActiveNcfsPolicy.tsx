import React from "react";
import { NcfsPolicy } from "../../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsPolicy";

export interface ActiveAdaptationPolicyProps {
    id: string,
    published: Date,
    policy: NcfsPolicy
}

const ActiveAdaptationPolicy = (props: ActiveAdaptationPolicyProps) => {
    return (
        <div>{props.id}</div>
    );
}

export default ActiveAdaptationPolicy;