import React, { useContext, useState } from "react";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../common/ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../common/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../common/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import UnsavedChangesPrompt from "../common/UnsavedChangesPrompt/UnsavedChangesPrompt";

import { PolicyContext } from "../../../context/policy/PolicyContext";

import classes from "./CurrentPolicy.module.scss";

const CurrentPolicy = () => {
	const {
		isPolicyChanged,
		currentPolicy,
		status
	} = useContext(PolicyContext);

	const [selectedTab, setSelectedTab] = useState("Adaptation Policy");

	const tabs = [
		{ testId: "buttonCurrentAdaptationPolicyTab", name: "Adaptation Policy" },
		{ testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
	];

	let policyTimestampData: any = null;
	if (currentPolicy) {
		policyTimestampData = (
			<div className={classes.tableContainer}>
				{status === "LOADED" &&
					<Table className={classes.table} id={currentPolicy.id}>
						<TableHead>
							<TableRow>
								<TableCell>Timestamp</TableCell>
								<TableCell>Updated By</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.tbody}>
							<TableRow>
								<TableCell>
									{new Date(currentPolicy.created).toLocaleString()}
								</TableCell>
								<TableCell>
									{currentPolicy.updatedBy ? currentPolicy.updatedBy : "N/A"}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				}
			</div>
		);
	}

	return (
		<div className={classes.Current}>
			{status === "LOADING" &&
				<div>Loading...</div>
			}

			{status === "ERROR" &&
				<div>Error getting Policy data.</div>
			}

			{status === "LOADED" &&
				<>
					<UnsavedChangesPrompt
						when={isPolicyChanged}
						message="You have unsaved changes in the draft tab, are you sure you want to leave the page?" />

					<TabNav
						tabs={tabs}
						selectedTabName={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

						<div className={classes.innerContent}>
							<Tab isSelected={selectedTab === "Adaptation Policy"} externalStyles={classes.Tab}>
								<h2 className={classes.head}>Content Management Flags</h2>
								{policyTimestampData}
								<ContentManagementFlags
									contentManagementFlags={currentPolicy.adaptionPolicy.contentManagementFlags}
									currentPolicyContentManagementFlags={currentPolicy.adaptionPolicy.contentManagementFlags}
									disabled />
							</Tab>

							<Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab}>
								<>
									<h2 className={classes.head}>Config for non-compliant files</h2>
									{policyTimestampData}
									<div className={classes.ncfsContainer}>
										<section className={classes.info}>
											<div>
												<h3>
													<strong>Un-Processable File Types</strong>{" "}
												</h3>
												<p>
													When the filetype of the original file is identified as one that
													the Glasswall SDK cannot rebuild.
													</p>
											</div>
											<div>
												<h3>
													<strong>Glasswall Blocked Files</strong>
												</h3>
												<p>The original file cannot be rebuilt by the Glasswall SDK</p>
											</div>
										</section>
										<RoutesForNonCompliantFiles
											ncfsRoutingUrl={currentPolicy.adaptionPolicy.ncfsRoute ?
												currentPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : ""}
											currentPolicyRoutingUrl={currentPolicy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl}
											disabled />

										<PolicyForNonCompliantFiles
											ncfsActions={currentPolicy.adaptionPolicy.ncfsActions}
											currentNcfsActions={currentPolicy.adaptionPolicy.ncfsActions}
											disabled />
									</div>
								</>
							</Tab>
						</div>
					</TabNav>
				</>
			}
		</div>
	);
}

export default CurrentPolicy;