import { updateObject } from "../../helpers/updateObject";

import * as actionTypes from "../actionTypes";

const changeDateRange = (state, { start, end }) => {
	return updateObject(state, { start: start, end: end });
};

export const analyticsReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_DATE_RANGE:
			return changeDateRange(state, action.payload);
		default:
			return state;
	}
};
