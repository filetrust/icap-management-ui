import React, { useEffect, useReducer } from "react";

import { GlobalStoreContext } from "./globalStore-context";
import { globalStoreReducer } from "./globalStore-reducers";

import * as actionTypes from "../actionTypes";

import userfiles from "../../data/userfiles.json";
import fileFilter from "../../data/filters/RequestHistory/fileFilter.json";
import riskFilter from "../../data/filters/RequestHistory/riskFilter.json";
import requestHistoryTimeFilter from "../../data/filters/RequestHistory/requestHistoryTimeFilter";
import analyticsTimeFilter from "../../data/filters/analyticsTimeFilter";
import { getVersion } from "./api";

const userfileList = userfiles;

export const GlobalStoreState = ({ children }) => {
	const initialState = {
		title: "Glasswall ICAP",
		version: "",
		userfiles: userfileList,
		fileFilter: fileFilter,
		riskFilter: riskFilter,
		requestHistoryTimeFilter: requestHistoryTimeFilter,
		analyticsTimeFilter: analyticsTimeFilter,
		isCurrentPolicy: true,
		selectedFilters: [],
		navExpanded: true
	};

	const [globalStoreState, dispatch] = useReducer(
		globalStoreReducer,
		initialState
	);

	const setVersion = (serverVersion) => {
		dispatch({ type: actionTypes.SET_VERSION, version: serverVersion });
	};

	const addFilterFromCheckbox = (filter) => {
		dispatch({ type: actionTypes.ADD_FILTER_FROM_CHECKBOXES, filter });
	};

	const addFilterInput = (filter) => {
		dispatch({ type: actionTypes.ADD_FILTER_FROM_INPUT, filter });
	};

	const removeFilter = (filter) => {
		dispatch({ type: actionTypes.REMOVE_FILTER, filter });
	};

	const updateRequestHistoryTimeFilter = (timeDateFilter) => {
		dispatch({ type: actionTypes.UPDATE_REQUEST_HISTORY_TIME_FILTER, timeDateFilter });
	};

	const updateAnalyticsTimeFilter = (timeDateFilter) => {
		dispatch({ type: actionTypes.UPDATE_ANALYTICS_TIME_FILTER, timeDateFilter });
	};

	const toggleNavExpanded = () => {
		dispatch({ type: actionTypes.TOGGLE_NAV_EXPANDED });
	};

	useEffect(() => {
		(async () => {
			try {
				const version = await getVersion();
				setVersion(version);
			}
			catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<GlobalStoreContext.Provider
			value={{
				state: globalStoreState,
				title: globalStoreState.title,
				version: globalStoreState.version,
				userfiles: globalStoreState.userfiles,
				fileFilter: globalStoreState.fileFilter,
				riskFilter: globalStoreState.riskFilter,
				selectedFilters: globalStoreState.selectedFilters,
				isCurrentPolicy: globalStoreState.isCurrentPolicy,
				requestHistoryTimeFilter: globalStoreState.requestHistoryTimeFilter,
				analyticsTimeFilter: globalStoreState.analyticsTimeFilter,
				navExpanded: globalStoreState.navExpanded,
				addFilterFromCheckbox,
				addFilterInput,
				removeFilter,
				updateRequestHistoryTimeFilter,
				updateAnalyticsTimeFilter,
				toggleNavExpanded
			}}>

			{children}

		</GlobalStoreContext.Provider>
	);
};
