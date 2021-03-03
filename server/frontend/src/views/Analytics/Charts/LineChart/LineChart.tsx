import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { DataPoint } from "../../../../../../src/common/models/TransactionEventService/GetMetrics/GetMetricsResponse";

export interface LineChartProps {
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
	scales: {
		yAxes: [
			{
				gridLines: {
					display: true
				},
				ticks: {
					min: 0,
					autoSkip: true,
					maxTicksLimit: 6,
					beginAtZero: true,
					sampleSize: 10
				},
			},
		],
		xAxes: [
			{
				gridLines: {
					display: false
				}
			}
		]
	},
	layout: {
		padding: {
			left: 50,
			right: 50,
			top: 50,
			bottom: 50,
		},
	},
};

const lineOptions = {
	lineTension: 0,
	borderWidth: 7,
	fill: false,
	hidden: true
};

const LineChart = (props: LineChartProps) => {
	const [chartData, setChartData] = useState({});

	const chart = () => {
		const labels = props.data.map(i => new Date(i.date).toLocaleTimeString());
		const processed = props.data.map(i => i.processed);
		const relay = props.data.map(i => i.processedByOutcome.Relay ?? 0);
		const replace = props.data.map(i => i.processedByOutcome.Replace ?? 0);
		const block = props.data.map(i => i.processedByOutcome.Block ?? 0);
		const failed = props.data.map(i => i.processedByOutcome.Failed ?? 0);
		const unmodified = props.data.map(i => i.processedByOutcome.Unmodified ?? 0);

		setChartData({
			labels,
			datasets: [
				{
					...lineOptions,
					label: "Total Files Processed",
					data: processed,
					borderColor: "#4592b0",
					hidden: false
				},
				{
					...lineOptions,
					label: "Relay",
					data: relay,
					borderColor: "#52bf66"
				},
				{
					...lineOptions,
					label: "Replace",
					data: replace,
					borderColor: "#5469ff"
				},
				{
					...lineOptions,
					label: "Block",
					data: block,
					borderColor: ""
				},
				{
					...lineOptions,
					label: "Failed",
					data: failed,
					borderColor: "#ff5b5b"
				},
				{
					...lineOptions,
					label: "Unmodified",
					data: unmodified,
					backgroundColor: "#949494",
					borderColor: "#949494"
				}
			]
		});
	};

	useEffect(() => {
		chart();
		// eslint-disable-next-line
	}, []);

	return (
		<div style={{ width: "100%", position: "relative" }}>
			<Line
				type="line"
				data={chartData}
				height={100}
				options={chartOptions} />
		</div>
	);
};

export default LineChart;
