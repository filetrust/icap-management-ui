import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Guid } from "guid-typescript";
import { UserContext } from "../user/UserContext";
import { PolicyContext } from "./PolicyContext";
import { policyReducer } from "./policy-reducers";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";
import * as actionTypes from "../actionTypes";
import {
	getCurrentPolicy,
	getDraftPolicy,
	saveDraftPolicy,
	publishPolicy as publish,
	deleteDraftPolicy as deleteDraft,
	getPolicyHistory
} from "./api";

interface InitialPolicyState {
	currentPolicy: Policy,
	draftPolicy: Policy,
	newDraftPolicy: Policy,
	policyHistory: PolicyHistory,
	isPolicyChanged: boolean,
	status: "LOADING" | "ERROR" | "LOADED",
	policyError: ""
}

export const PolicyState = (props: { children: React.ReactNode }) => {
	const user = useContext(UserContext).currentUser;
	const cancellationTokenSource = axios.CancelToken.source();

	const initialState: InitialPolicyState = {
		currentPolicy: null,
		draftPolicy: null,
		newDraftPolicy: null,
		policyHistory: null,
		isPolicyChanged: false,
		status: "LOADING",
		policyError: ""
	}

	const [policyState, dispatch] = useReducer(policyReducer, initialState);

	const setPolicyError = (error: string) => {
		dispatch({ type: actionTypes.SET_POLICY_ERROR, error });
	}

	const setStatus = (status: "LOADING" | "ERROR" | "LOADED") => {
		dispatch({ type: actionTypes.SET_STATUS, status });
	}

	const setIsPolicyChanged = (changed: boolean) => {
		dispatch({ type: actionTypes.SET_IS_POLICY_CHANGED, changed });
	}

	const setCurrentPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_CURRENT_POLICY, currentPolicy: policy });
	}

	const setDraftPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_DRAFT_POLICY, draftPolicy: policy });
	}

	const setPolicyHistory = (policyHistory: PolicyHistory) => {
		dispatch({ type: actionTypes.SET_POLICY_HISTORY, policyHistory });
	}

	const setNewDraftPolicy = (policy: Policy) => {
		dispatch({ type: actionTypes.SET_NEW_DRAFT_POLICY, newPolicy: policy });
	}

	const _loadPolicies = async () => {
		const currentPolicy = await getCurrentPolicy(cancellationTokenSource.token);
		if (currentPolicy.adaptionPolicy === null) {
			throw new Error("Current Policy - Adaptation Policy cannot be null");
		}
		setCurrentPolicy(currentPolicy);

		const draftPolicy = await getDraftPolicy(cancellationTokenSource.token);
		if (draftPolicy.adaptionPolicy === null) {
			throw new Error("Draft Policy - Adaptation Policy cannot be null");
		}
		setDraftPolicy(draftPolicy);
		setNewDraftPolicy(draftPolicy);

		const policyHistory = await getPolicyHistory(cancellationTokenSource.token);
		if (policyHistory.policiesCount) {
			policyHistory.policies.sort((a: any, b: any) => {
				return Date.parse(b.created) - Date.parse(a.created);
			});
		}
		setPolicyHistory(policyHistory);
	}

	const saveDraftChanges = () => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				await saveDraftPolicy({...policyState.newDraftPolicy, updatedBy: user.username}, cancellationTokenSource.token);
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
	}

	const cancelDraftChanges = () => {
		dispatch({ type: actionTypes.CANCEL_DRAFT_CHANGES });
	}

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
	}

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
	}

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
		}

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
			isPolicyChanged: policyState.isPolicyChanged,
			status: policyState.status,
			policyError: policyState.policyError
		}}>
			{ props.children}
		</PolicyContext.Provider>
	);
}