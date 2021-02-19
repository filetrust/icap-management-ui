import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./daterangepicker.scss";

import classes from "./DaterangePicker.module.scss";

export interface DaterangePickerProps {
	initialRange: { start: moment.Moment, end: moment.Moment },
	onRangeChange: (start: moment.Moment, end: moment.Moment) => void,
	externalStyles: string,
	disabled?: boolean
}

const DaterangePicker = (props: DaterangePickerProps) => {

	const handleCallback = (start: moment.Moment, end: moment.Moment) => {
		props.onRangeChange(start, end);
	};

	const dateRangeSpanElement = (
		<div data-test-id="dateRangePicker" id="reportrange" className={classes.reportrange}>
			<span>
				{
					props.initialRange.start.format("DD/MM/YYYY H:mm A") +
					" - " +
					props.initialRange.end.format("DD/MM/YYYY H:mm A")
				}
			</span>
		</div>
	);

	return (
		<div className={[classes.Daterangepicker, props.externalStyles].join(" ")}>
			<div className={classes.intervalButton}>Date/Time</div>
			{props.disabled &&
				<>
					{dateRangeSpanElement}
				</>
			}

			{!props.disabled &&
				<DateRangePicker
					initialSettings={{
						timePicker: true,
						timePicker24Hour: true,
						maxSpan: { days: 1 },
						maxDate: moment(),
						startDate: props.initialRange.start.toDate(),
						endDate: props.initialRange.end.toDate(),
						locale: {
							format: "DD/MM/YYYY H:mm A",
						},
						ranges: {
							"1 Hour": [
								moment().subtract(1, "hour").toDate(),
								moment().toDate(),
							],
							"12 Hours": [
								moment().subtract(12, "hour").toDate(),
								moment().toDate(),
							],
							"24 Hours": [
								moment().subtract(24, "hour").toDate(),
								moment().toDate(),
							],
						}
					}}
					onCallback={handleCallback} >

					{dateRangeSpanElement}

				</DateRangePicker>
			}
		</div>
	);
};

export default DaterangePicker;