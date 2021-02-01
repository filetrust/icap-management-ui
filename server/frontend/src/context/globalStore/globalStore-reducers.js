import { updateObject } from "../../helpers/updateObject";

import * as actionTypes from "../actionTypes";

const changePageTitle = (state, title) => {
	return updateObject(state, { title: title });
};

const _checkboxChange = (updateFilter, changeFilter) => {
	updateFilter.map((filter) => {
		if (filter.filterName === changeFilter.filterName) {
			filter.checkboxList.map((checkbox) => {
				if (checkbox.id === changeFilter.id) {
					checkbox.isChecked = changeFilter.isChecked;
				}
				return null;
			});
		}
		return null;
	});
};

const setVersion = (state, version) => {
	return updateObject(state, {
		version: version
	});
};

const addFilterFromCheckboxes = (state, addedFilter) => {
	let updatedList = [...state.selectedFilters];

	const included = updatedList.some((filter) => {
		return filter.id === addedFilter.id;
	});

	_checkboxChange([...state.fileFilter], addedFilter);

	if (updatedList.length <= 0 ||
		(addedFilter.isChecked === true && !included)
	) {
		updatedList.push(addedFilter);
	} else {
		updatedList = updatedList.filter(
			(filter) => addedFilter.id !== filter.id
		);
	}

	return updateObject(state, {
		selectedFilters: updatedList,
	});
};

const addFilterFromInput = (state, addedFilter) => {
	let updatedList = [...state.selectedFilters];

	const included = updatedList.some((filter) => {
		return filter.id === addedFilter.id;
	});

	if (!included) {
		updatedList.push(addedFilter);
	}

	return updateObject(state, {
		selectedFilters: updatedList,
	});
};

const removeFilterFromSelected = (state, removedFilter) => {
	const updateCheckbox = [...state.fileFilter];

	updateCheckbox.forEach((filter) => {
		if (removedFilter.filterName === filter.filterName) {
			filter.checkboxList.forEach((checkbox) => {
				if (checkbox.id === removedFilter.id) {
					checkbox.isChecked = false;
				}
			});
		}
	});

	const updatedList = [...state.selectedFilters].filter(
		(filter) => filter.id !== removedFilter.id
	);

	return updateObject(state, {
		selectedFilters: updatedList,
	});
};

const updateRequestHistoryTimeFilter = (state, timeDateFilter) => {
	return updateObject(state, {
		requestHistoryTimeFilter: timeDateFilter
	});
};

const updateAnalyticsTimeFilter = (state, timeDateFilter) => {
	return updateObject(state, {
		analyticsTimeFilter: timeDateFilter
	});
};

const toggleNavExpanded = (state) => {
	return updateObject(state, {
		navExpanded: !state.navExpanded
	});
};

export const globalStoreReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_VERSION:
			return setVersion(state, action.version);
		case actionTypes.CHANGE_PAGE_TITLE:
			return changePageTitle(state, action.title);
		case actionTypes.ADD_FILTER_FROM_CHECKBOXES:
			return addFilterFromCheckboxes(state, action.filter);
		case actionTypes.ADD_FILTER_FROM_INPUT:
			return addFilterFromInput(state, action.filter);
		case actionTypes.REMOVE_FILTER:
			return removeFilterFromSelected(state, action.filter);
		case actionTypes.TOGGLE_NAV_EXPANDED:
			return toggleNavExpanded(state);
		case actionTypes.UPDATE_REQUEST_HISTORY_TIME_FILTER:
			return updateRequestHistoryTimeFilter(state, action.timeDateFilter);
		case actionTypes.UPDATE_ANALYTICS_TIME_FILTER:
			return updateAnalyticsTimeFilter(state, action.timeDateFilter);
		default:
			return state;
	}
};
