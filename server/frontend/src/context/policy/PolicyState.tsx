import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Guid } from "guid-typescript";
import { UserContext } from "../user/UserContext";
import { PolicyContext } from "./PolicyContext";
import { policyReducer } from "./policy-reducers";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";
import { PolicyType } from "../../../../src/common/models/enums/PolicyType";
import * as actionTypes from "../actionTypes";
import {
	getCurrentPolicy,
	getDraftPolicy,
	saveDraftPolicy,
	publishPolicy as publish,
	deleteDraftPolicy as deleteDraft,
	getPaginatedPolicyHistory
} from "./api";
import PaginationModel from "../../../../src/common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/PaginationModel/PaginationModel";

interface InitialPolicyState {
	currentPolicy: Policy,
	draftPolicy: Policy,
	newDraftPolicy: Policy,
	policyHistory: PolicyHistory,
	policyHistoryPagination: PaginationModel,
	isPolicyChanged: boolean,
	status: "LOADING" | "ERROR" | "LOADED",
	policyError: ""
}

const _handleNullPolicies = (policy: Policy, policyType: PolicyType) => {
	if (policy.adaptionPolicy === null || undefined) {
		throw new Error(`${PolicyType[policyType]} Policy - Adaptation Policy cannot be null`);
	}

	if (policy.ncfsPolicy === null || undefined) {
		throw new Error(`${PolicyType[policyType]} Policy - NCFS Policy cannot be null`);
	}
};

export const PolicyState = (props: { children: React.ReactNode }) => {
	const user = useContext(UserContext).currentUser;
	const cancellationTokenSource = axios.CancelToken.source();

	const initialState: InitialPolicyState = {
		currentPolicy: null,
		draftPolicy: null,
		newDraftPolicy: null,
		policyHistory: null,
		policyHistoryPagination: new PaginationModel(0, 25),
		isPolicyChanged: false,
		status: "LOADING",
		policyError: ""
	};

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const setPolicyError = (error: string) => {
		dispatch({ type: actionTypes.SET_POLICY_ERROR, error });
	};

	const setStatus = (status: "LOADING" | "ERROR" | "LOADED") => {
		dispatch({ type: actionTypes.SET_STATUS, status });
	};

	const setIsPolicyChanged = (changed: boolean) => {
		dispatch({ type: actionTypes.SET_IS_POLICY_CHANGED, changed });
	};

	const setCurrentPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_CURRENT_POLICY, currentPolicy: policy });
	};

	const setDraftPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_DRAFT_POLICY, draftPolicy: policy });
	};

	const setPolicyHistory = (policyHistory: PolicyHistory) => {
		dispatch({ type: actionTypes.SET_POLICY_HISTORY, policyHistory });
	};

	const setNewDraftPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_NEW_DRAFT_POLICY, newPolicy: policy });
	};

	const _loadPolicyHistory = async (pagination: PaginationModel) => {
		const policyHistory = await getPaginatedPolicyHistory(pagination, cancellationTokenSource.token);

		if ((policyHistory as PolicyHistory).policiesCount) {
			(policyHistory as PolicyHistory).policies.sort((a: any, b: any) => {
				return Date.parse(b.created) - Date.parse(a.created);
			});
		}

		return policyHistory;
	};

	const _loadPolicies = async () => {
		const requestChain = [
			getCurrentPolicy(cancellationTokenSource.token),
			getDraftPolicy(cancellationTokenSource.token),
			_loadPolicyHistory(policyState.policyHistoryPagination)
		];

		const [currentPolicy, draftPolicy, policyHistory] = await Promise.all<Policy | PolicyHistory>(requestChain);

		_handleNullPolicies(currentPolicy as Policy, PolicyType.Current);
		setCurrentPolicy(currentPolicy as Policy);

		_handleNullPolicies(draftPolicy as Policy, PolicyType.Draft);
		setDraftPolicy(draftPolicy as Policy);
		setNewDraftPolicy(draftPolicy as Policy);

		setPolicyHistory(policyHistory as PolicyHistory);
	};

	const saveDraftChanges = () => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await saveDraftPolicy({ ...policyState.newDraftPolicy, updatedBy: user.username }, cancellationTokenSource.token);
				setDraftPolicy(policyState.newDraftPolicy);
				setIsPolicyChanged(false);
				status = "LOADED";
			}
			catch (error) {
				status = "ERROR";
				setPolicyError(error);
			}
			finally {
				setStatus(status);
			}
		})();
	};

	const cancelDraftChanges = () => {
		dispatch({ type: actionTypes.CANCEL_DRAFT_CHANGES });
	};

	const publishPolicy = (policyId: Guid) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await publish(policyId, cancellationTokenSource.token);

				await _loadPolicies();

				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();
	};

	const deleteDraftPolicy = (policyId: Guid) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await deleteDraft(policyId, cancellationTokenSource.token);

				await _loadPolicies();

				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();
	};

	const setPolicyHistoryPagination = (pagination: PaginationModel) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);
		dispatch({ type: actionTypes.SET_POLICY_HISTORY_PAGINATION, pagination });

		(async () => {
			try {
				const policyHistory = await _loadPolicyHistory(pagination);
				setPolicyHistory(policyHistory);
				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();
	};

	useEffect(() => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await _loadPolicies();

				status = "LOADED";
			}
			catch (error) {
				setPolicyError(error);
				status = "ERROR";
			}
			finally {
				setStatus(status);
			}
		})();

		return () => {
			if (policyState.status === "LOADING") {
				cancellationTokenSource.cancel();
			}
		};

		// eslint-disable-next-line
	}, []);

	return (
		<PolicyContext.Provider value={{
			currentPolicy: policyState.currentPolicy,
			draftPolicy: policyState.draftPolicy,
			newDraftPolicy: policyState.newDraftPolicy,
			setNewDraftPolicy,
			saveDraftChanges,
			cancelDraftChanges,
			publishPolicy,
			deleteDraftPolicy,
			policyHistory: policyState.policyHistory,
			policyHistoryPagination: policyState.policyHistoryPagination,
			setPolicyHistoryPagination,
			isPolicyChanged: policyState.isPolicyChanged,
			status: policyState.status,
			policyError: policyState.policyError
		}}>
			{ props.children}
		</PolicyContext.Provider>
	);
};