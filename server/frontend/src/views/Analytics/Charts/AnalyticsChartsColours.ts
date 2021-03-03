export interface IAnalyticsChartsColours {
	outcomePieChart: {
		relay: string,
		replace: string,
		block: string,
		failed: string,
		unmodified: string
	},

	outcomeLineChart: {
		relay: string,
		replace: string,
		block: string,
		failed: string,
		unmodified: string
	}
}

class AnalyticsChartsColours implements IAnalyticsChartsColours {
	outcomePieChart = {
		relay: "#52bf66",
		replace: "#5469ff",
		block: "#eabe51",
		failed: "#ff5b5b",
		unmodified: "#949494"
	};

	outcomeLineChart = {
		relay: "#52bf66",
		replace: "#5469ff",
		block: "#eabe51",
		failed: "#ff5b5b",
		unmodified: "#949494"
	};
}

export default AnalyticsChartsColours;