import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

import { DataPoint } from "../../../../../../src/common/models/TransactionEventService/GetMetrics/GetMetricsResponse";

export interface OutcomePieChartProps {
	data: DataPoint[]
}

const chartOptions = {
	legend: {
		position: "bottom",

		labels: {
			padding: 10,
			boxWidth: 10,
		},
	},
	tooltips: {
		enabled: true,
		backgroundColor: "#FFF",
		titleFontSize: 16,
		titleFontColor: "#0066ff",
		bodyFontColor: "#000",
		bodyFontSize: 14,
		displayColors: true,
	},
	scales: {
		yAxes: [
			{
				display: false
			}
		],
		xAxes: [
			{
				display: false
			}
		]
	},
};

const reducer = (accumulator: number, current: number) => accumulator + current;

const OutcomePieChart = (props: OutcomePieChartProps) => {
	const [chartData, setChartData] = useState({});

	const chart = () => {
		const failed = props.data
			.map(i => i.processedByOutcome.Failed)
			.reduce(reducer);

		const replaced = props.data
			.map(i => i.processedByOutcome.Replace)
			.reduce(reducer);

		const unmodified = props.data
			.map(i => i.processedByOutcome.Unmodified)
			.reduce(reducer);

		setChartData({
			labels: ["Failed", "Replace", "Unmodified"],
			datasets: [
				{
					data: [failed, replaced, unmodified],
					backgroundColor: ["#ff5b5b", "#5469ff", "#949494"],
				},
			],
		});
	};

	useEffect(() => {
		chart();
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ width: "50rem", position: "relative", paddingTop: "3rem" }}>
			<Pie
				type="pie"
				data={chartData}
				options={chartOptions} />
		</div>
	);
};

export default OutcomePieChart;
