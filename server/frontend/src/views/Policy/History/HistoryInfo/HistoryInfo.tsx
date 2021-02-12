import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import React, { useState } from "react";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Tab from "../../../../components/Tabs/Tab/Tab";
import TabNav from "../../../../components/Tabs/TabNav/TabNav";
import ContentManagementFlags from "../../common/ContentManagementFlags/ContentManagementFlags";
import PolicyForNonCompliantFiles from "../../common/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import RoutesForNonCompliantFiles from "../../common/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";

import classes from "./HistoryInfo.module.scss";

export interface HistoryInfoProps {
	policy: Policy
}

const HistoryInfo = (props: HistoryInfoProps) => {

	const tabs = [
		{ testId: "buttonCurrentAdaptationPolicyTab", name: "Adaptation Policy" },
		{ testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
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
							disabled />
					</Tab>

					<Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab}>
						<>
							<h2 className={classes.head}>Config for non-compliant files</h2>
							<div className={classes.ncfsContainer}>
								<RoutesForNonCompliantFiles
									ncfsRoutingUrl={props.policy.adaptionPolicy.ncfsRoute ? props.policy.adaptionPolicy.ncfsRoute.ncfsRoutingUrl : ""}
									disabled />

								<PolicyForNonCompliantFiles
									ncfsActions={props.policy.adaptionPolicy.ncfsActions}
									disabled />
							</div>
						</>
					</Tab>
				</div>
			</TabNav>
		</section>
	);
};

export default HistoryInfo;
