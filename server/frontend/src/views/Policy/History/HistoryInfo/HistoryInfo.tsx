import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React, { useState } from "react";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Tab from "../../../../components/Tabs/Tab/Tab";
import TabNav from "../../../../components/Tabs/TabNav/TabNav";
import ContentManagementFlags from "../../common/ContentManagementFlags/ContentManagementFlags";
import PolicyForNonCompliantFiles from "../../common/Ncfs/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import ReferenceNcfs from "../../common/Ncfs/ReferenceNcfs/ReferenceNcfs";
import RoutesForNonCompliantFiles from "../../common/Ncfs/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";

import classes from "./HistoryInfo.module.scss";

export interface HistoryInfoProps {
	policy: Policy
}

const HistoryInfo = (props: HistoryInfoProps) => {

	const tabs = [
		{ testId: "buttonCurrentAdaptationPolicyTab", name: "Adaptation Policy" },
		{ testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
		{ testId: "buttonReferenceNcfsTab", name: "Reference NCFS" }
	];

	const [selectedTab, setSelectedTab] = useState<string | "Adaptation Policy" | "NCFS Policy">("Adaptation Policy");

	const policyTimestampData = (
		<div className={classes.tableContainer}>
			<Table className={classes.table} id={props.policy.id}>
				<TableHead>
					<TableRow>
						<TableCell>Timestamp</TableCell>
						<TableCell>Updated By</TableCell>
					</TableRow>
				</TableHead>
				<TableBody className={classes.tbody}>
					<TableRow>
						<TableCell>
							{new Date(props.policy.created).toLocaleString()}
						</TableCell>
						<TableCell>
							{props.policy.updatedBy ? props.policy.updatedBy : "N/A"}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);

	return (
		<section className={classes.HistoryInfo}>
			<header className={classes.header}>
				<h2>Policy: {props.policy.id}</h2>
			</header>
			{policyTimestampData}
			<TabNav
				tabs={tabs}
				selectedTabName={selectedTab}
				onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

				<div className={classes.innerContent}>
					<Tab isSelected={selectedTab === "Adaptation Policy"} externalStyles={classes.Tab}>
						<h2 className={classes.head}>Content Management Flags</h2>
						<ContentManagementFlags
							contentManagementFlags={props.policy.adaptionPolicy.contentManagementFlags}
							currentPolicyContentManagementFlags={props.policy.adaptionPolicy.contentManagementFlags}
							disabled />
					</Tab>

					<Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab}>
						<>
							<h2 className={classes.head}>Config for non-compliant files</h2>
							<div className={classes.ncfsContainer}>
								<RoutesForNonCompliantFiles
									ncfsRoutingUrl={props.policy.adaptionPolicy.ncfsRoute !== null ? props.policy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : ""}
									currentPolicyRoutingUrl={props.policy.adaptionPolicy.ncfsRoute !== null ? props.policy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : ""}
									disabled />

								<PolicyForNonCompliantFiles
									ncfsActions={props.policy.adaptionPolicy.ncfsActions}
									currentNcfsActions={props.policy.adaptionPolicy.ncfsActions}
									disabled />
							</div>
						</>
					</Tab>

					<Tab isSelected={selectedTab === "Reference NCFS"} externalStyles={classes.Tab}>
						<h2 className={classes.head}>
							<div className={classes.header}>Reference NCFS Actions</div>
						</h2>
						<div className={classes.ncfsContainer}>
							{/* TODO: Remove once Policy Management API doesn't return null for ncfsPolicy.ncfsActions */}
							{props.policy.ncfsPolicy.ncfsActions === null &&
								<section style={{ marginLeft: "2rem", padding: "2rem 0" }}>
									<div>
										<p>
											The Reference NCFS settings for this policy are missing.
										</p>
									</div>
								</section>
							}

							{props.policy.ncfsPolicy.ncfsActions &&
								<ReferenceNcfs
									ncfsActions={props.policy.ncfsPolicy.ncfsActions}
									currentNcfsActions={props.policy.ncfsPolicy.ncfsActions}
									disabled />
							}
						</div>
					</Tab>
				</div>
			</TabNav>
		</section>
	);
};

export default HistoryInfo;
