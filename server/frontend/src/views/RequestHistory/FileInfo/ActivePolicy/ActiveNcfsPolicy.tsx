import React from "react";

import RoutesForNonCompliantFiles from "../../../Policy/common/Ncfs/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../../../Policy/common/Ncfs/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import { AdaptionPolicy } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/AdaptionPolicy";


export interface ActiveAdaptationPolicyProps {
	adaptationPolicy: AdaptionPolicy
}

const ActiveNcfsPolicy = (props: ActiveAdaptationPolicyProps) => {
	return (
		<>
			<RoutesForNonCompliantFiles
				ncfsRoutingUrl={props.adaptationPolicy.ncfsRoute !== null ?
					props.adaptationPolicy.ncfsRoute.ncfsRoutingUrl : ""}
				currentPolicyRoutingUrl={props.adaptationPolicy.ncfsRoute.ncfsRoutingUrl !== null ?
					props.adaptationPolicy.ncfsRoute.ncfsRoutingUrl : ""}
				disabled />

			<PolicyForNonCompliantFiles
				ncfsActions={props.adaptationPolicy.ncfsActions}
				currentNcfsActions={props.adaptationPolicy.ncfsActions}
				disabled />
		</>
	);
}

export default ActiveNcfsPolicy;