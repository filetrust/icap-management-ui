import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
const LineChart = ({ data }) => {
	const [chartData, setChartData] = useState({});

	const chart = () => {

		const labels = data.data.map(i => new Date(i.date).toLocaleTimeString());
		const processed = data.data.map(i => i.processed);

		setChartData({
			labels,
			datasets: [
				{
					label: "Files Processed",
					data: processed,
					lineTension: 0,
					backgroundColor: ["#7394ca"],
					borderColor: "#7394ca",
					borderWidth: 4
				}
			]
		});
	};

	useEffect(() => {
		chart();
		// eslint-disable-next-line
	}, []);

	return (
		<div
			style={{
				width: "100%",
				position: "relative",
			}}
		>
			<Line
				type="line"
				data={chartData}
				height={100}
				options={{
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
								ticks: {
									min: 0,
									autoSkip: true,
									maxTicksLimit: 6,
									beginAtZero: true,
								},
							},
						],
					},
					layout: {
						padding: {
							left: 50,
							right: 50,
							top: 50,
							bottom: 50,
						},
					},
				}}
			/>
		</div>
	);
};

export default LineChart;
