import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

import { DataPoint } from "../../../../../../src/common/models/TransactionEventService/GetMetrics/GetMetricsResponse";
import AnalyticsChartsColours from "../AnalyticsChartsColours";

export interface OutcomePieChartProps {
	data: DataPoint[]
}

const chartColours = new AnalyticsChartsColours().outcomePieChart;

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
		const relay = props.data
			.map(i => i.processedByOutcome.Relay ?? 0)
			.reduce(reducer);

		const replace = props.data
			.map(i => i.processedByOutcome.Replace ?? 0)
			.reduce(reducer);

		const block = props.data
			.map(i => i.processedByOutcome.Block ?? 0)
			.reduce(reducer);

		const failed = props.data
			.map(i => i.processedByOutcome.Failed ?? 0)
			.reduce(reducer);


		const unmodified = props.data
			.map(i => i.processedByOutcome.Unmodified ?? 0)
			.reduce(reducer);

		setChartData({
			labels: ["Relay", "Replace", "Block", "Failed", "Unmodified"],
			datasets: [
				{
					data: [
						relay,
						replace,
						block,
						failed,
						unmodified
					],

					backgroundColor: [
						chartColours.relay,
						chartColours.replace,
						chartColours.block,
						chartColours.failed,
						chartColours.unmodified
					],
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
