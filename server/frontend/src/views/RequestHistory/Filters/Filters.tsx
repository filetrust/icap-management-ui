import React, { useState, useContext, FormEvent, useEffect } from "react";
import { Guid } from "guid-typescript";

import { GlobalStoreContext } from "../../../context/globalStore/globalStore-context";
import { RequestHistoryTimeFilter } from "../../../data/filters/RequestHistory/requestHistoryTimeFilter";

import Popup, { PopupButton } from "../../../components/UI/Popup/Popup";
import PopupFilter from "./PopupFilter/PopupFilter";
import SelectedFilter from "../../../components/UI/SelectedFilter/SelectedFilter";
import DaterangePicker from "../../../components/UI/DaterangePicker/DaterangePicker";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";

import classes from "./Filters.module.scss";

export interface FiltersProps {
	showFilters: boolean,
	setShowFilters: (value: boolean | ((prevVar: boolean) => boolean)) => void,
	showAddFilter: boolean,
	setShowAddFilter: (value: boolean | ((prevVar: boolean) => boolean)) => void,
	disabled: boolean
}

const Filters = (props: FiltersProps) => {
	const {
		addFilterInput,
		fileFilter,
		riskFilter,
		selectedFilters,
		removeFilter,
		navExpanded,
		updateRequestHistoryTimeFilter,
		requestHistoryTimeFilter } = useContext(GlobalStoreContext);

	const [openFilter, setOpenFilter] = useState(null);

	const [fileId, setFileId] = useState("");
	const [showFileIdInput, setShowFileIdInput] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [isTouched, setIsTouched] = useState(false);

	const [dateRangeFilter, setDateRangeFilter] = useState({
		start: requestHistoryTimeFilter.timestampRangeStart,
		end: requestHistoryTimeFilter.timestampRangeEnd
	});

	const filtersClasses = [classes.filters];
	const moreFiltersButtonClasses = [classes.moreFilters];
	const arrowClasses = [classes.arrow];

	if (props.showFilters) {
		filtersClasses.push(classes.show);
		moreFiltersButtonClasses.push(classes.hide);
		arrowClasses.push(classes.rotate);
	}

	const toggleShowFilters = () => {
		if (!props.disabled) {
			props.setShowFilters((prevState) => !prevState);
			props.setShowAddFilter(false);
			setOpenFilter(null);
		}
	};

	const toggleShowAddFilterList = () => {
		props.setShowAddFilter((prevState) => !prevState);
		setOpenFilter(null);
	};

	const hideAddFilterList = () => {
		props.setShowAddFilter(false);
		setOpenFilter(null);
	};

	const updateFileId = (fileIdInput: string) => {
		setFileId(fileIdInput);
		setIsValid(Guid.isGuid(fileIdInput));
		setIsTouched(fileIdInput.length > 0);
	};

	const addFileIdFilter = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addFilterInput({
			id: fileId,
			filterName: "File ID",
			title: fileId,
			fileId
		});
		setShowFileIdInput(false);
		setFileId("");
		props.setShowAddFilter(false);
	};

	const onRangeChange = (start: moment.Moment, end: moment.Moment) => {
		setDateRangeFilter({ start, end });
	};

	let selectedFilter = null;
	let filterStyle = null;

	switch (openFilter) {
		case "File Types":
			selectedFilter = fileFilter;
			filterStyle = classes.popupFilterFileType;
			break;
		case "Risk":
			selectedFilter = riskFilter;
			filterStyle = classes.popupFilterRisk;
			break;
	}

	const filterList: PopupButton[] = [
		{
			testId: "buttonFilterFileId",
			name: "File ID",
			onClickButtonHandler: () => {
				setShowFileIdInput((prevState) => !prevState);
				setOpenFilter(null);
			},
		},
		{
			testId: "buttonFilterFileTypes",
			name: "File Types",
			onClickButtonHandler: () => {
				setShowFileIdInput(false);
				setOpenFilter("File Types");
			},
		},
		{
			testId: "buttonFilterRisk",
			name: "Risk",
			onClickButtonHandler: () => {
				setShowFileIdInput(false);
				setOpenFilter("Risk");
			},
		}
	];

	useEffect(() => {
		const newTimeFilter: RequestHistoryTimeFilter = {
			timestampRangeStart: dateRangeFilter.start,
			timestampRangeEnd: dateRangeFilter.end
		};

		updateRequestHistoryTimeFilter(newTimeFilter);

	}, [dateRangeFilter]);

	return (
		<section className={`${classes.Filters} ${navExpanded ? classes.expanded : ""}`}>
			<div className={classes.wrap}>
				<div className={classes.header}>
					<h2 className={classes.head}>Filters</h2>

					<button
						data-test-id="buttonMoreFilters"
						className={moreFiltersButtonClasses.join(" ")}
						onClick={toggleShowFilters}>
						More Filters...
					</button>
					<span
						data-test-id="moreFiltersArrow"
						onClick={toggleShowFilters}
						className={arrowClasses.join(" ")} />

					<DaterangePicker
						initialRange={dateRangeFilter}
						onRangeChange={onRangeChange}
						externalStyles={classes.pickers}
						disabled={props.disabled} />
				</div>
				<div className={classes.footer} id="filtersContainer">
					<div className={filtersClasses.join(" ")}>
						{props.showFilters && (
							<div className={classes.storyLine}>
								{selectedFilters.map((filter) => {
									return (
										<SelectedFilter
											key={filter.id}
											id={filter.id}
											filterName={filter.filterName}
											title={filter.title}
											titleColor={filter.titleColor}
											remove={removeFilter}
											disabled={props.disabled} />
									);
								}
								)}
							</div>
						)}
					</div>
					{props.showFilters && (
						<div>
							<Button
								testId="addFilterButton"
								buttonType={"button"}
								externalStyles={classes.addFilter}
								onButtonClick={toggleShowAddFilterList}
								disabled={props.disabled}>
								+ Add Filter
							</Button>
						</div>
					)}
				</div>

				{props.showAddFilter ? (
					<>
						<Popup
							popupButtons={filterList}
							externalStyles={classes.popup}
							openPopupHover={() => props.setShowAddFilter(true)}
							closePopupHover={() => props.setShowAddFilter(false)}>
							{openFilter && (
								<PopupFilter
									testId={`div${openFilter}Filter`}
									filters={selectedFilter}
									externalStyles={filterStyle}
									openPopupHover={() => props.setShowAddFilter(true)}
									closePopupHover={hideAddFilterList}
									disabled={props.disabled} />
							)}
						</Popup>

						{showFileIdInput && (
							<form
								className={classes.fileId}
								onSubmit={addFileIdFilter}
								onMouseEnter={() => props.setShowAddFilter(true)}>

								<Input
									type="text"
									name="fileId"
									externalStyles={classes.inputFileId}
									autofocus
									placeholder={"File ID"}
									valid={isValid}
									touched={isTouched}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										updateFileId(event.target.value);
									}}
									disabled={props.disabled} />

								<button
									type="submit"
									className={classes.addButton}
									disabled={!isValid}>
									+ ADD
								</button>

								<button
									type="button"
									className={classes.addButton}
									onClick={() => {
										setShowFileIdInput(false);
										setFileId("");
										setIsTouched(false);
									}}>
									Cancel
								</button>
							</form>
						)}
					</>
				) : null}
			</div>
		</section>
	);
};

export default Filters;
