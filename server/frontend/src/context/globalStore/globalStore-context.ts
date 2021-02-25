/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { AnalyticsTimeFilter } from "../../data/filters/analyticsTimeFilter";
import { RequestHistoryTimeFilter } from "../../data/filters/RequestHistory/requestHistoryTimeFilter";

export interface GlobalStoreContextProps {
	title: string,
	version: string,
	requestHistoryTimeFilter: RequestHistoryTimeFilter,
	updateRequestHistoryTimeFilter: (timeDateFilter: RequestHistoryTimeFilter) => void,
	analyticsTimeFilter: AnalyticsTimeFilter,
	updateAnalyticsTimeFilter: (timeDateFilter: AnalyticsTimeFilter) => void,
	selectedFilters: any[],
	navExpanded: boolean,
	toggleNavExpanded: () => void,
	addFilterInput: (filter: any) => void,
	fileFilter:
	{
		id: string,
		filterName: string,
		checkboxList: {
			id: string,
			type: string,
			title: string,
			isChecked: boolean,
			fileTypeEnum: number
		}[]
	}[],
	riskFilter:
	{
		id: "risk",
		filterName: "Risk",
		checkboxList: {
			id: string,
			title: string,
			titleColor: string,
			isChecked: boolean,
			type: string,
			riskEnum: number
		}[]
	}[],
	removeFilter: (filter: any) => void,
	addFilterFromCheckbox: (filter: any) => void
}

export const GlobalStoreContext = createContext<Partial<GlobalStoreContextProps>>({});