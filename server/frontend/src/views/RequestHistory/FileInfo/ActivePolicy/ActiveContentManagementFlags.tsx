import React from "react";

import ContentManagementFlags from "../../../Policy/common/ContentManagementFlags/ContentManagementFlags";
import { AdaptionPolicy } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/AdaptionPolicy";

export interface ActiveContentManagementFlagsProps {
	adaptationPolicy: AdaptionPolicy
}

const ActiveContentManagementFlags = (props: ActiveContentManagementFlagsProps) => {
	return (
		<>
			<ContentManagementFlags
				contentManagementFlags={props.adaptationPolicy.contentManagementFlags}
				currentPolicyContentManagementFlags={props.adaptationPolicy.contentManagementFlags}
				disabled />
		</>
	);
};

export default ActiveContentManagementFlags;