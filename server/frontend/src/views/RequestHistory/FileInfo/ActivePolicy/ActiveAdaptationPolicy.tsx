import React from "react";
import { AdaptionPolicy } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/AdaptionPolicy";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export interface ActiveAdaptationPolicyProps {
    id: string,
    published: Date,
    updatedBy: string,
    adaptationPolicy: AdaptionPolicy
}

const ActiveAdaptationPolicy = (props: ActiveAdaptationPolicyProps) => {
    return (
        <div>{props.id}</div>
    );
}

export default ActiveAdaptationPolicy;