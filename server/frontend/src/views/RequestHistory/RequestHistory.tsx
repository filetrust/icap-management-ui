import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
} from "@material-ui/core";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import { Filter as TFilter } from "../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import TransactionFile from "../../../../src/common/models/TransactionEventService/TransactionFile";

import { getTransactions } from "./api/index";
import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";
import FileInfo from "./FileInfo/FileInfo";
import FileRow from "./FileRow/FileRow";
import Filters from "./Filters/Filters";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

import classes from "./RequestHistory.module.scss";

const RequestHistory = () => {
	const CancelToken = axios.CancelToken;
	const cancellationTokenSource = CancelToken.source();

	const [transactions, setTransactions] = useState(null);

	const [selectedFile, setSelectedFile] = useState(null);
	const [showFileInfoModal, setShowFileInfoModal] = useState(false);

	const [timestampFilterDirection, setTimestampFilterDirection] = useState<"asc" | "desc">("desc");

	const [showFilters, setShowFilters] = useState(false);
	const [showAddFilter, setShowAddFilter] = useState(false);

	const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);

	const { selectedFilters, requestHistoryTimeFilter } = useContext(GlobalStoreContext);

	const tableClasses = [classes.tableWrapper];
	if (showAddFilter) {
		tableClasses.push(classes.blurred);
	}

	const openInfoModal = (fileId: { value: string }) => {
		setShowFileInfoModal((prevState) => !prevState);

		const file = transactions.files.find(
			(f: any) => f.fileId.value === fileId
		);

		setSelectedFile(file);
	};

	const closeInfoModal = () => {
		setShowFileInfoModal(false);
	};

	const sortTransactionsDescending = (files: TransactionFile[]) => {
		return files.sort((a: TransactionFile, b: TransactionFile) => {
			return Date.parse(`${b.timestamp}`) - Date.parse(`${a.timestamp}`);
		});
	};

	const sortTransactionsAscending = (files: TransactionFile[]) => {
		return files.sort((a: TransactionFile, b: TransactionFile) => {
			return Date.parse(`${a.timestamp}`) - Date.parse(`${b.timestamp}`);
		});
	};

	const handleTimestampTableFilter = () => {
		if (!transactions.files) {
			return;
		}

		if (!transactions.files.length) {
			return;
		}

		const direction = timestampFilterDirection;

		if (direction === "asc") {
			setTransactions((prev: any) => {
				return {
					count: prev.count,
					files: sortTransactionsDescending(prev.files)
				};
			});
			setTimestampFilterDirection("desc");
		}

		if (direction === "desc") {
			setTransactions((prev: any) => {
				return {
					count: prev.count,
					files: sortTransactionsAscending(prev.files)
				};
			});
			setTimestampFilterDirection("asc");
		}
	};

	useEffect(() => {
		setStatus("LOADING");

		const getTransactionsAsync = async () => {
			const Risks = selectedFilters
				.filter(f => f.filterName === "Risk")
				.map(riskFilter => riskFilter.riskEnum);

			const FileTypes = selectedFilters
				.filter(f => f.filterName.startsWith("FileType"))
				.map(fileTypeFilter => fileTypeFilter.fileTypeEnum);

			const FileIds = selectedFilters
				.filter(f => f.filterName === "File ID")
				.map(fileIdFilter => fileIdFilter.fileId);

			const requestBody: TFilter = {
				TimestampRangeStart: requestHistoryTimeFilter.timestampRangeStart.toDate(),
				TimestampRangeEnd: requestHistoryTimeFilter.timestampRangeEnd.toDate(),
				Risks,
				FileTypes,
				FileIds
			};

			try {
				const transactionsResponse = await getTransactions(
					requestBody, cancellationTokenSource.token);
				let files: TransactionFile[] = [];

				if (transactionsResponse.files.length) {
					if (timestampFilterDirection === "desc") {
						files = sortTransactionsDescending(transactionsResponse.files);
					}

					if (timestampFilterDirection === "asc") {
						files = sortTransactionsAscending(transactionsResponse.files);
					}
				}

				setTransactions({
					count: transactionsResponse.count,
					files
				});

				setStatus("LOADED");
			}
			catch (error) {
				setStatus("ERROR");
				// tslint:disable-next-line: no-console
				console.error("RequestHistory: " + error);
			}
		}

		getTransactionsAsync();

		return () => {
			if (status === "LOADING") {
				cancellationTokenSource.cancel();
			}
		}

		// eslint-disable-next-line
	}, [selectedFilters, requestHistoryTimeFilter.timestampRangeStart, requestHistoryTimeFilter.timestampRangeEnd]);

	return (
		<>
			<MainTitle title="Request History" />

			<Filters showFilters={showFilters} setShowFilters={setShowFilters} showAddFilter={showAddFilter} setShowAddFilter={setShowAddFilter} disabled={status === "LOADING"} />

			<Main externalStyles={`${classes.main} ${showFilters ? classes.filtersTabOpen : ""}`}>
				<article className={classes.container}>
					<div className={tableClasses.join(" ")}>
						{status === "LOADING" &&
							<div>Loading...</div>
						}

						{status !== "LOADING" &&
							<>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>
												<TableSortLabel
													direction={timestampFilterDirection}
													active={true}
													onClick={() => handleTimestampTableFilter()}>
													Timestamp
												</TableSortLabel>
											</TableCell>

											<TableCell>
												File ID
												</TableCell>

											<TableCell>
												File Type
												</TableCell>

											<TableCell>
												Risk (Transaction)
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody className={classes.tbody}>
										{status === "LOADED" && transactions &&
											<>
												{transactions.count > 0 &&
													<>
														{transactions.files.map((f: any) => {
															return (
																<FileRow
																	key={f.fileId.value}
																	id={f.fileId.value}
																	timestamp={f.timestamp}
																	fileId={f.fileId}
																	type={f.fileType}
																	risk={f.risk}
																	onRowClickHandler={() => openInfoModal(f.fileId.value)} />
															);
														})}
													</>
												}

												{transactions.count === 0 &&
													<TableRow className={classes.emptyTableRow}>
														<TableCell colSpan={4} className={classes.emptyTableCell}>
															<h2>No Transaction Data Found</h2>
														</TableCell>
													</TableRow>
												}
											</>}

										{status === "ERROR" &&
											<TableRow className={classes.emptyTableRow}>
												<TableCell colSpan={4} className={classes.emptyTableCell}>
													<h2>Error Getting Transaction Data</h2>
												</TableCell>
											</TableRow>
										}
									</TableBody>
								</Table>
							</>
						}
					</div>
					{status !== "ERROR" && showFileInfoModal && (
						<>
							<Modal onCloseHandler={closeInfoModal} externalStyles={classes.modal}>
								<FileInfo
									fileData={selectedFile} />
							</Modal>
							<Backdrop onClickOutside={closeInfoModal} />
						</>
					)}
				</article>
			</Main>
		</>
	);
};

export default RequestHistory;