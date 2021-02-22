import React from "react";
import { NcfsOption } from "../../../../../../../src/common/models/enums/NcfsOption";

import classes from "./Toggles.module.scss";

export interface UnProcessableFileTypesTogglesProps {
	unprocessableFileTypeAction: NcfsOption,
	updateOption?: (newOption: NcfsOption) => void,
	currentOption: NcfsOption,
	referenceNcfs?: boolean,
	disabled?: boolean
}

const UnProcessableFileTypesToggles = (props: UnProcessableFileTypesTogglesProps) => {
	return (
		<div className={classes.Toggles}>
			<form method="post" action="">
				<div className={classes.input}>
					<input data-test-id="input-unprocessableFileTypes-relay"
						id="relay-unprocessableFileTypes"
						type="radio"
						name="toggle"
						checked={props.unprocessableFileTypeAction === NcfsOption.Relay}
						onChange={() => props.updateOption(NcfsOption.Relay)}
						disabled={props.disabled} />

					<label
						className={props.currentOption === NcfsOption.Relay && props.unprocessableFileTypeAction !== NcfsOption.Relay ? classes.touched : ""}
						htmlFor="relay-unprocessableFileTypes">
						{" "}
						<strong>Relay </strong>- The unmodified original file should be
						relayed
					</label>
				</div>
				<div className={classes.input}>
					<input data-test-id="input-unprocessableFileTypes-block"
						id="block-unprocessableFileTypes"
						type="radio"
						name="toggle"
						checked={props.unprocessableFileTypeAction === NcfsOption.Block}
						onChange={() => props.updateOption(NcfsOption.Block)}
						disabled={props.disabled} />

					<label
						className={props.currentOption === NcfsOption.Block && props.unprocessableFileTypeAction !== NcfsOption.Block ? classes.touched : ""}
						htmlFor="block-unprocessableFileTypes">
						{" "}
						<strong>Block </strong>- The original file should be blocked. An
						Error report should be constructed using the template included in
						the Adaptation Policy.
					</label>
				</div>
				{!props.referenceNcfs &&
					<div className={classes.input}>
						<input data-test-id="input-unprocessableFileTypes-refer"
							id="refer-unprocessableFileTypes"
							type="radio"
							name="toggle"
							checked={props.unprocessableFileTypeAction === NcfsOption.Refer}
							onChange={() => props.updateOption(NcfsOption.Refer)}
							disabled={props.disabled} />

						<label
							className={props.currentOption === NcfsOption.Refer && props.unprocessableFileTypeAction !== NcfsOption.Refer ? classes.touched : ""}
							htmlFor="refer-unprocessableFileTypes">
							{" "}
							<strong>Refer </strong>- The document is submitted to the
							'Non-compliant File Service' (see section 1.4.5 Non-compliant File
							Service). The return information from this call is then used to
							construct the Transaction Outcome message.
						</label>
					</div>
				}
			</form>
		</div>
	);
};

export default UnProcessableFileTypesToggles;
