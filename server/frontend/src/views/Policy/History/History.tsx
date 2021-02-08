import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from "@material-ui/core";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { PolicyType } from "../../../../../src/common/models/enums/PolicyType";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Modal from "../../../components/UI/Modal/Modal";
import ConfirmPublishModal from "./ConfirmPublishModal/ConfirmPublishModal";
import UnsavedChangesPrompt from "../common/UnsavedChangesPrompt/UnsavedChangesPrompt";
import EmptyHistoryRow from "./HistoryRow/EmptyHistoryRow";
import HistoryRow from "./HistoryRow/HistoryRow";
import HistoryInfo from "./HistoryInfo/HistoryInfo";
import Pagination from "../../../components/UI/Pagination/Pagination";
import { PolicyContext } from "../../../context/policy/PolicyContext";

import classes from "./History.module.scss";

const History = () => {
	const {
		isPolicyChanged,
		status,
		policyHistory,
		policyHistoryPagination,
		setPolicyHistoryPagination
	} = useContext(PolicyContext);

	const [showPolicyModal, setShowPolicyModal] = useState(false);
	const [selectedPolicy, setSelectedPolicy] = useState<Policy>(null);
	const [showConfirmPublishModal, setShowConfirmPublishModal] = useState(false);

	const openPolicyModal = (policyId: string) => {
		setSelectedPolicy(
			policyHistory.policies.find(policy => policy.id === policyId));
		setShowPolicyModal(true);
	};

	const openConfirmPublishModal = (policyId: string) => {
		setSelectedPolicy(
			policyHistory.policies.find(policy => policy.id === policyId));
		setShowConfirmPublishModal(true);
	};

	const setPageSize = (pageSize: 25 | 50 | 100) => {
		setPolicyHistoryPagination({
			...policyHistoryPagination,
			pageSize
		});
	}

	const setIndex = (index: number) => {
		setPolicyHistoryPagination({
			...policyHistoryPagination,
			zeroBasedIndex: index
		});
	}

	return (
		<>
			{status === "LOADING" &&
				<div className={classes.History}>
					Loading...
				</div>
			}

			{status === "ERROR" &&
				<div>Error getting Policy data.</div>
			}

			{status === "LOADED" && policyHistory !== null &&
				<>
					<UnsavedChangesPrompt
						when={isPolicyChanged}
						message="You have unsaved changes in the draft tab, are you sure you want to leave the page?" />

					<div className={classes.History}>
						<div className={classes.container}>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell>Timestamp</TableCell>
										<TableCell>Updated By</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className={classes.tbody}>
									{policyHistory.policiesCount > 0 &&
										<>
											{policyHistory.policies.map((policy: Policy) => {
												return (
													<HistoryRow
														key={policy.id}
														id={policy.id}
														isCurrent={policy.policyType === PolicyType.Current}
														openPreviousPolicyModalHandler={() => openPolicyModal(policy.id)}
														activatePreviousPolicyHandler={() => openConfirmPublishModal(policy.id)}
														timestamp={new Date(policy.created).toLocaleString()}
														updatedBy={policy.updatedBy ? policy.updatedBy : "N/A"}
													/>
												)
											})}
										</>
									}

									{!policyHistory.policies &&
										<EmptyHistoryRow />
									}
								</TableBody>

							</Table>

							<Pagination
								count={policyHistory.policiesCount}
								page={policyHistoryPagination.zeroBasedIndex}
								onChangePage={(event, page) => setIndex(page)}
								rowsPerPage={policyHistoryPagination.pageSize}
								rowsPerPageOptions={[25, 50, 100]}
								onChangeRowsPerPage={
									(event: React.ChangeEvent<HTMLInputElement>) =>
										setPageSize(parseInt(event.target.value, 10) as 25 | 50 | 100)
								} />
						</div>
					</div>

					<CSSTransition
						in={showPolicyModal}
						timeout={300}
						mountOnEnter
						unmountOnExit
						classNames={{
							enter: classes.openPopupEnter,
							enterActive: classes.openPopupEnterActive,
							exit: classes.closePopupExit,
							exitActive: classes.closePopupExitActive,
						}}>
						<Modal onCloseHandler={() => setShowPolicyModal(false)}>
							<HistoryInfo policy={selectedPolicy} />
						</Modal>
					</CSSTransition>

					{selectedPolicy !== null &&
						<CSSTransition
							in={showConfirmPublishModal}
							timeout={300}
							mountOnEnter
							unmountOnExit
							classNames={{
								enter: classes.openPopupEnter,
								enterActive: classes.openPopupEnterActive,
								exit: classes.closePopupExit,
								exitActive: classes.closePopupExitActive,
							}}>
							<Modal onCloseHandler={() => setShowConfirmPublishModal(false)} externalStyles={classes.confirmPublishModal}>
								<ConfirmPublishModal policyId={selectedPolicy.id} onCancelHandler={() => setShowConfirmPublishModal(false)} />
							</Modal>
						</CSSTransition>
					}

					<CSSTransition
						in={showPolicyModal || showConfirmPublishModal}
						timeout={300}
						mountOnEnter
						unmountOnExit
						classNames={{
							enter: classes.openBackdropEnter,
							enterActive: classes.openBackdropEnterActive,
							exit: classes.closeBackdropExit,
							exitActive: classes.closeBackdropExitActive,
						}}
					>
						<Backdrop onClickOutside={() => setShowPolicyModal(false)} />
					</CSSTransition>
				</>
			}
		</>
	);
};

export default History;
