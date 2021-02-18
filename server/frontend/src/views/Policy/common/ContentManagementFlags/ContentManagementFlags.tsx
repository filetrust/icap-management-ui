import React from "react";

import { ContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/ContentFlags";
import { WordContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/WordContentFlags";
import { ExcelContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/ExcelContentFlags";
import { PowerpointContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/PowerpointContentFlags";
import { PdfContentFlags } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/PdfContentFlags";

import WordContentManagementFlags from "./WordContentManagementFlags/WordContentManagementFlags";
import ExcelContentManagementFlags from "./ExcelContentManagementFlags/ExcelContentManagementFlags";
import PowerpointContentManagementFlags from "./PowerpointContentManagementFlags/PowerpointContentManagementFlags";
import PdfContentManagementFlags from "./PdfContentManagementFlags/PdfContentManagementFlags";

import classes from "./ContentManagementFlags.module.scss";

export interface ContentManagementFlagsProps {
	contentManagementFlags: ContentFlags,
	currentPolicyContentManagementFlags: ContentFlags,
	updateContentFlags?: (newContentFlags: ContentFlags) => void,
	disabled?: boolean
}

const ContentManagementFlags = (props: ContentManagementFlagsProps) => {
	const { contentManagementFlags, currentPolicyContentManagementFlags, updateContentFlags } = props;

	const updateWordContentFlags = (newWordContentFlags: WordContentFlags) => {
		updateContentFlags({
			...contentManagementFlags,
			wordContentManagement: newWordContentFlags
		});
	};

	const updateExcelContentFlags = (newExcelContentFlags: ExcelContentFlags) => {
		updateContentFlags({
			...contentManagementFlags,
			excelContentManagement: newExcelContentFlags
		});
	};

	const updatePowerpointContentFlags = (newPowerpointContentFlags: PowerpointContentFlags) => {
		updateContentFlags({
			...contentManagementFlags,
			powerPointContentManagement: newPowerpointContentFlags
		});
	};

	const updatePdfContentFlags = (newPdfContentFlags: PdfContentFlags) => {
		updateContentFlags({
			...contentManagementFlags,
			pdfContentManagement: newPdfContentFlags
		});
	};

	return (
		<div className={classes.contentFlagsContainer}>
			<div className={classes.block}>
				<h2>Word</h2>
				<div data-test-id="currentPolicySectionWord" className={classes.CurrentRow}>
					<WordContentManagementFlags
						initialWordContentFlags={contentManagementFlags.wordContentManagement}
						updateWordContentFlags={updateWordContentFlags}
						currentWordContentFlags={currentPolicyContentManagementFlags.wordContentManagement}
						allDisabled={props.disabled} />
				</div>
			</div>
			<div className={classes.block}>
				<h2>Excel</h2>
				<div data-test-id="currentPolicySectionExcel" className={classes.CurrentRow}>
					<ExcelContentManagementFlags
						initialExcelContentFlags={contentManagementFlags.excelContentManagement}
						updateExcelContentFlags={updateExcelContentFlags}
						currentExcelContentFlags={currentPolicyContentManagementFlags.excelContentManagement}
						allDisabled={props.disabled} />
				</div>
			</div>
			<div className={classes.block}>
				<h2>Powerpoint</h2>
				<div data-test-id="currentPolicySectionPowerpoint" className={classes.CurrentRow}>
					<PowerpointContentManagementFlags
						initialPowerpointContentFlags={contentManagementFlags.powerPointContentManagement}
						updatePowerpointContentFlags={updatePowerpointContentFlags}
						currentPowerPointContentFlags={currentPolicyContentManagementFlags.powerPointContentManagement}
						allDisabled={props.disabled} />
				</div>
			</div>

			<div className={classes.block}>
				<h2>PDF</h2>
				<div data-test-id="currentPolicySectionPdf" className={classes.CurrentRow}>
					<PdfContentManagementFlags
						initialPdfContentFlags={contentManagementFlags.pdfContentManagement}
						updatePdfContentFlags={updatePdfContentFlags}
						currentPdfContentFlags={currentPolicyContentManagementFlags.pdfContentManagement}
						allDisabled={props.disabled} />
				</div>
			</div>
		</div>
	);
};

export default ContentManagementFlags;