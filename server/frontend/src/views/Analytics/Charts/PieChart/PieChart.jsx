import React, { useState, useEffect } from "react";

import { Pie } from "react-chartjs-2";

const PieChart = () => {
	const [chartData, setChartData] = useState({});

	const chart = () => {
		setChartData({
			labels: ["Safe", "Blocked", "Dangerous", "Unclassified"],
			datasets: [
				{
					data: [87420, 43823, 313, 1770],
					backgroundColor: ["#7394ca", "#e1974e", "#818787", "#ccc374"],
				},
			],
		});
	};

	useEffect(() => {
		chart();
	}, []);

	return (
		<div
			style={{
				width: "50rem",

				position: "relative",
				padding: "3rem 3rem 6rem 3rem",
			}}
		>
			<Pie
				type="pie"
				data={chartData}
				options={{
					legend: {
						position: "bottom",

						labels: {
							padding: 10,
							boxWidth: 10,
						},
					},
					tooltips: {
						//enabled: false,
						backgroundColor: "#FFF",
						titleFontSize: 16,
						titleFontColor: "#0066ff",
						bodyFontColor: "#000",
						bodyFontSize: 14,
						displayColors: true,
						//intersect: false,
					},
					scales: {
						yAxes: [
							{
								ticks: {
									min: 0,
									max: 1,
									maxTicksLimit: 1,
									autoSkip: true,
									beginAtZero: true,
								},
							},
						],
					},
				}}
			/>
		</div>
	);
};

export default PieChart;
