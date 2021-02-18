import { createContext } from "react";
import { AnalyticsTimeFilter } from "../../data/filters/analyticsTimeFilter";
import { RequestHistoryTimeFilter } from "../../data/filters/RequestHistory/requestHistoryTimeFilter";

export interface GlobalStoreContextProps {
	title: string,
	version: string,
	userfiles: any[],
	fileFilterList: any[],
	riskFilterList: any[],
	requestHistoryTimeFilter: RequestHistoryTimeFilter,
	analyticsTimeFilter: AnalyticsTimeFilter,
	updateAnalyticsTimeFilter: (timeDateFilter: any) => void,
	selectedFilters: any[],
	navExpanded: boolean,
	toggleNavExpanded: () => void
}

export const GlobalStoreContext = createContext<Partial<GlobalStoreContextProps>>({});