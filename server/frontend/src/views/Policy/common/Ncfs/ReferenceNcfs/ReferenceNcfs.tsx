import React from "react";
import { NcfsOption } from "../../../../../../../src/common/models/enums/NcfsOption";
import { NcfsActions } from "../../../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";
import GlasswallBlockedFilesToggles from "../Toggles/GlasswallBlockedFilesToggles";
import UnProcessableFileTypesToggles from "../Toggles/UnProcessableFileTypesToggles";

import classes from "./ReferenceNcfs.module.scss";

export interface ReferenceNcfsProps {
	ncfsActions: NcfsActions,
	updateNcfsActions?: (newNcfsActions: NcfsActions) => void,
	currentNcfsActions: NcfsActions,
	disabled?: boolean
}

const ReferenceNcfs = (props: ReferenceNcfsProps) => {
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
		<div className={classes.ReferenceNcfs}>
			<section className={classes.wrapBlocksToggle}>
				<label className={classes.toggleHead}>Un-Processable File Types</label>
				<UnProcessableFileTypesToggles
					unprocessableFileTypeAction={props.ncfsActions.unprocessableFileTypeAction}
					updateOption={updateUnProcessableFileTypes}
					currentOption={props.currentNcfsActions.unprocessableFileTypeAction}
					referenceNcfs
					disabled={props.disabled} />

				<label className={classes.toggleHead}>Glasswall Blocked Files</label>
				<GlasswallBlockedFilesToggles
					glasswallBlockedFilesAction={props.ncfsActions.glasswallBlockedFilesAction}
					updateOption={updateGlasswallBlockedFiles}
					currentOption={props.currentNcfsActions.glasswallBlockedFilesAction}
					referenceNcfs
					disabled={props.disabled} />

			</section>
		</div>
	);
};

export default ReferenceNcfs;