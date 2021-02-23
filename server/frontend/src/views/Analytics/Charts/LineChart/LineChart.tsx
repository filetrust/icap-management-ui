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

const LineChart = (props: LineChartProps) => {
	const [chartData, setChartData] = useState({});

	const chart = () => {
		const labels = props.data.map(i => new Date(i.date).toLocaleTimeString());
		const processed = props.data.map(i => i.processed);
		const failed = props.data.map(i => i.processedByOutcome.Failed);
		const replace = props.data.map(i => i.processedByOutcome.Replace);
		const unmodified = props.data.map(i => i.processedByOutcome.Unmodified);

		setChartData({
			labels,
			datasets: [
				{
					label: "Total Files Processed",
					data: processed,
					lineTension: 0,
					borderColor: "#4592b0",
					borderWidth: 7,
					fill: false
				},
				{
					label: "Failed",
					data: failed,
					lineTension: 0,
					borderColor: "#ff5b5b",
					borderWidth: 7,
					fill: false,
					hidden: true
				},
				{
					label: "Replace",
					data: replace,
					lineTension: 0,
					borderColor: "#5469ff",
					borderWidth: 7,
					fill: false,
					hidden: true
				},
				{
					label: "Unmodified",
					data: unmodified,
					lineTension: 0,
					backgroundColor: "#949494",
					borderColor: "#949494",
					borderWidth: 7,
					fill: false,
					hidden: true
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
