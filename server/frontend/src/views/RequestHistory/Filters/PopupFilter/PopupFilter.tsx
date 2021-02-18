import React from "react";
import classes from "./PopupFilter.module.scss";
import Filter from "../../Filters/Filter/Filter";

import { TransactionLogFilters } from "../../../../types/TransactionLogFilter";

export interface PopupFilterProps {
	testId: string,
	filters: TransactionLogFilters[],
	externalStyles: string,
	openPopupHover: React.MouseEventHandler<HTMLDivElement>,
	closePopupHover: React.MouseEventHandler<HTMLDivElement>,
	disabled?: boolean
}

const PopupFilter = (props: PopupFilterProps) => {
	const addedFilter = props.filters.map((filter: TransactionLogFilters) => {
		let filterStyle = classes.fileType;
		if (filter.filterName === "Risk") {
			filterStyle = classes.risk;
		}
		return (
			<Filter
				key={filter.id}
				filterName={filter.filterName}
				externalStyles={filterStyle}
				checkboxList={filter.checkboxList}
				disabled={props.disabled} />
		);
	});
	return (
		<section
			data-test-id={props.testId}
			className={[classes.PopupFilter, props.externalStyles].join(" ")}
			onMouseEnter={props.openPopupHover}>

			<div className={classes.inner}>{addedFilter}</div>

		</section>
	);
};

export default PopupFilter;
