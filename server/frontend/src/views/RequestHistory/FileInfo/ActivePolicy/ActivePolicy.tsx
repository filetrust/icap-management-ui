import React from "react";

export interface ActivePolicyProps {
    policyId: string
}

const ActivePolicy = (props: ActivePolicyProps) => {
    return (
        <div>{props.policyId}</div>
    );
}

export default ActivePolicy;