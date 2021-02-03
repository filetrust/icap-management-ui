import equal from "deep-equal";
import { updateObject } from "../../helpers/updateObject";
import * as actionTypes from "../actionTypes";
import { TPolicyState } from "./PolicyContext";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

const setIsPolicyChanged = (state: TPolicyState, changed: boolean) => {
	return updateObject(state, {
		isPolicyChanged: changed
	});
};

const setPolicyError = (state: TPolicyState, error: any) => {
	// tslint:disable-next-line: no-console
	console.error(error.message ? error.message : error);

	return updateObject(state, {
		policyError: error
	});
};

const setStatus = (state: TPolicyState, status: "LOADING" | "ERROR" | "LOADED") => {
	return updateObject(state, {
		status
	})
};

const setCurrentPolicy = (state: TPolicyState, policy: Policy) => {
	return updateObject(state, {
		currentPolicy: policy
	});
};

const setDraftPolicy = (state: TPolicyState, policy: Policy) => {
	return updateObject(state, {
		draftPolicy: policy
	});
};

const setPolicyHistory = (state: TPolicyState, history: PolicyHistory) => {
	return updateObject(state, {
		policyHistory: history
	})
}

const setNewDraftPolicy = (state: TPolicyState, policy: Policy) => {
	const isPolicyEqual = equal(state.draftPolicy, policy);

	return updateObject(state, {
		newDraftPolicy: policy,
		isPolicyChanged: !isPolicyEqual,
	});
};

const cancelDraftChanges = (state: TPolicyState) => {
	return updateObject(state, {
		newDraftPolicy: state.draftPolicy,
		isPolicyChanged: false,
	});
};

export const policyReducer = (state: TPolicyState, action: { [actionName: string]: any }) => {
	switch (action.type) {
		case actionTypes.SET_IS_POLICY_CHANGED:
			return setIsPolicyChanged(state, action.changed);
		case actionTypes.SET_POLICY_ERROR:
			return setPolicyError(state, action.error);
		case actionTypes.SET_STATUS:
			return setStatus(state, action.status);
		case actionTypes.SET_CURRENT_POLICY:
			return setCurrentPolicy(state, action.currentPolicy);
		case actionTypes.SET_DRAFT_POLICY:
			return setDraftPolicy(state, action.draftPolicy);
		case actionTypes.SET_NEW_DRAFT_POLICY:
			return setNewDraftPolicy(state, action.newPolicy);
		case actionTypes.CANCEL_DRAFT_CHANGES:
			return cancelDraftChanges(state);
		case actionTypes.SET_POLICY_HISTORY:
			return setPolicyHistory(state, action.policyHistory);
		default:
			return state;
	}
};
