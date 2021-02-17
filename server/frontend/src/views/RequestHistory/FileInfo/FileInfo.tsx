import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";
import moment from "moment";
import Tab from "../../../components/Tabs/Tab/Tab";
import TabNav from "../../../components/Tabs/TabNav/TabNav";
import TransactionDetails from "./TransactionDetails/TransactionDetails";
import ActiveContentManagementFlags from "./ActivePolicy/ActiveContentManagementFlags";
// import ActiveNcfsPolicy from "./ActivePolicy/ActiveNcfsPolicy";
import { FileDetailsStatus } from "../../../../../src/common/models/enums/FileDetailsStatus";
import { FileType } from "../../../../../src/common/models/enums/FileType";
import { Risk } from "../../../../../src/common/models/enums/Risk";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { getTransactionDetails } from "../api/index";
import { getPolicyById } from "../../../context/policy/api/helpers/getPolicyById";

import Routes from "../../../Routes";

import classes from "./FileInfo.module.scss";
import ActivePolicyDetails from "./ActivePolicy/ActivePolicyDetails";

interface FileData {
	timestamp: string,
	fileId: { value: string },
	fileType: number,
	risk: number,
	activePolicyId: { value: string },
	directory: string
}

export interface FileInfoProps {
	fileData: FileData,
}

const FileInfo = (props: FileInfoProps) => {
	const getPolicyRoute = new Routes().policyRoutes.getPolicyByIdRoute;
	const CancelToken = axios.CancelToken;
	const cancellationTokenSource = CancelToken.source();

	const [transactionDetails, setTransactionDetails] = useState(null);
	const [activePolicy, setActivePolicy] = useState<Policy>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	const tabs = [
		{ testId: "buttonAnalysis", name: "Analysis" },
		{ testId: "buttonContentManagementFlags", name: "Content Management Flags" },
		// { testId: "buttonActivePolicyNcfsPolicy", name: "NCFS Policy" }
	];
	const [selectedTab, setSelectedTab] =
		useState<string | "Analysis" | "Content Management Flags" | "NCFS Policy">("Analysis");

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);

		(async () => {
			try {
				const transactionDetailResponse =
					await getTransactionDetails(props.fileData.directory, cancellationTokenSource.token);
				setTransactionDetails(transactionDetailResponse);

				const activePolicyResponse =
					await getPolicyById(getPolicyRoute, props.fileData.activePolicyId.value, cancellationTokenSource.token);

				if (!activePolicyResponse.adaptionPolicy) {
					// tslint:disable-next-line: no-console
					console.error(`Adaptation Policy Cannot be null - PolicyId: ${props.fileData.activePolicyId.value}`);
					setIsError(true);
				}
				setActivePolicy(activePolicyResponse);
			}
			catch (error) {
				setIsError(true);
			}
			finally {
				setIsLoading(false);
			}
		})();

		return () => {
			cancellationTokenSource.cancel();
		}

		// eslint-disable-next-line
	}, [setIsLoading, setIsError, setTransactionDetails, props.fileData.directory]);

	let background = null;
	switch (props.fileData.risk as Risk) {
		case Risk["Allowed by Policy"]:
			background = "#86C1CB";
			break;
		case Risk["Blocked by Policy"]:
			background = "#DF9F81";
			break;
		case Risk["Allowed by NCFS"]:
			background = "#7a7aff";
			break;
		case Risk["Blocked by NCFS"]:
			background = "#ff8d8d";
			break;
		case Risk.Safe:
			background = "#91CAA8";
			break;
		default:
			background = "";
	}

	return (
		<section className={classes.FileInfo}>
			<header className={classes.header}>
				<h2>File ID: {props.fileData.fileId.value}</h2>
				<div>
					<span style={{ background }}>{Risk[props.fileData.risk]}</span>
				</div>
			</header>

			<div className={classes.inner}>
				<div className={classes.requestInfo}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Timestamp</TableCell>
								<TableCell>Unique File ID</TableCell>
								<TableCell>Detected File Extension</TableCell>
								<TableCell>Risk (Transaction)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow className={classes.noborder}>
								<TableCell>{moment(props.fileData.timestamp).format("DD/MM/YYYY hh:mm A")}</TableCell>
								<TableCell>{props.fileData.fileId.value}</TableCell>
								<TableCell>{FileType[props.fileData.fileType]}</TableCell>
								<TableCell>{Risk[props.fileData.risk]}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>

				{isLoading &&
					<Table className={classes.table}>
						<TableBody>
							<TableRow>
								<TableCell className={classes.emptyTableCell}>
									Loading...
							</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				}

				{!isLoading &&
					<>
						{isError &&
							<Table className={classes.table}>
								<TableBody>
									<TableRow>
										<TableCell className={classes.emptyTableCell}>
											Error Getting Transaction Details
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						}

						{!isError &&
							<div className={classes.tabContainer}>
								{transactionDetails.status === FileDetailsStatus.Success &&
									<TabNav
										tabs={tabs}
										selectedTabName={selectedTab}
										onSetActiveTabHandler={tab => setSelectedTab(tab)}>
										<Tab isSelected={selectedTab === "Analysis"} externalStyles={classes.Tab} innnerContentStyles={classes.tabInnerContent}>
											<TransactionDetails analysisReport={transactionDetails.analysisReport} />
										</Tab>
										<Tab isSelected={selectedTab === "Content Management Flags"} externalStyles={classes.Tab} innnerContentStyles={classes.tabInnerContent}>
											<ActivePolicyDetails
												id={activePolicy.id}
												published={activePolicy.published}
												updatedBy={activePolicy.updatedBy} />

											<ActiveContentManagementFlags adaptationPolicy={activePolicy.adaptionPolicy} />
										</Tab>
										{/* <Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab} innnerContentStyles={classes.tabInnerContent}>
											<ActivePolicyDetails
												id={activePolicy.id}
												published={activePolicy.published}
												updatedBy={activePolicy.updatedBy} />

											<ActiveNcfsPolicy adaptationPolicy={activePolicy.adaptionPolicy} />
										</Tab> */}
									</TabNav>
								}
							</div>
						}
					</>
				}

			</div>
		</section >
	);
};

export default FileInfo;
