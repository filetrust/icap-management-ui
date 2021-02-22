import React from "react";
import { NcfsOption } from "../../../../../../../src/common/models/enums/NcfsOption";
import { NcfsActions } from "../../../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";

import classes from "./PolicyForNonCompliantFiles.module.scss";
import GlasswallBlockedFilesToggles from "../Toggles/GlasswallBlockedFilesToggles";
import UnProcessableFileTypesToggles from "../Toggles/UnProcessableFileTypesToggles";

export interface PolicyForNonCompliantFilesProps {
	ncfsActions: NcfsActions,
	updateNcfsActions?: (newNcfsActions: NcfsActions) => void,
	currentNcfsActions: NcfsActions,
	disabled?: boolean
}

const PolicyForNonCompliantFiles = (props: PolicyForNonCompliantFilesProps) => {
	const updateUnProcessableFileTypes = (newOption: NcfsOption) => {
		props.updateNcfsActions({
			...props.ncfsActions,
			unprocessableFileTypeAction: newOption
		});
	};

	const updateGlasswallBlockedFiles = (newOption: NcfsOption) => {
		props.updateNcfsActions({
			...props.ncfsActions,
			glasswallBlockedFilesAction: newOption
		});
	};

	return (
		<div className={classes.PolicyForNonCompliantFiles}>
			<section className={classes.wrapBlocksToggle}>
				<label className={classes.toggleHead}>Un-Processable File Types</label>
				<UnProcessableFileTypesToggles
					unprocessableFileTypeAction={props.ncfsActions.unprocessableFileTypeAction}
					updateOption={updateUnProcessableFileTypes}
					currentOption={props.currentNcfsActions.unprocessableFileTypeAction}
					disabled={props.disabled} />

				<label className={classes.toggleHead}>Glasswall Blocked Files</label>
				<GlasswallBlockedFilesToggles
					glasswallBlockedFilesAction={props.ncfsActions.glasswallBlockedFilesAction}
					updateOption={updateGlasswallBlockedFiles}
					currentOption={props.currentNcfsActions.glasswallBlockedFilesAction}
					disabled={props.disabled} />

			</section>
		</div>
	);
};

export default PolicyForNonCompliantFiles;
