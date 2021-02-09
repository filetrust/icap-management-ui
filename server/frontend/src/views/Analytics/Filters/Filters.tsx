import { Moment } from "moment";
import React, { useState, useContext, useEffect } from "react";

import DaterangePicker from "../../../components/UI/DaterangePicker/DaterangePicker";

import { GlobalStoreContext } from "../../../context/globalStore/globalStore-context";

import classes from "./Filters.module.scss";

export interface FiltersProps {
    disabled?: boolean
}

const Filters = (props: FiltersProps) => {
    const {
        navExpanded,
        analyticsTimeFilter,
        updateAnalyticsTimeFilter
    } = useContext(GlobalStoreContext);

    const [dateRangeFilter, setDateRangeFilter] = useState({
        start: analyticsTimeFilter.timestampRangeStart,
        end: analyticsTimeFilter.timestampRangeEnd
    });

    useEffect(() => {
        const newTimeFilter = {
            timestampRangeStart: dateRangeFilter.start,
            timestampRangeEnd: dateRangeFilter.end
        };

        updateAnalyticsTimeFilter(newTimeFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRangeFilter]);

    const onRangeChange = (start: Moment, end: Moment) => {
        setDateRangeFilter({ start, end });
    }

    return (
        <>
            <section className={`${classes.Filters} ${navExpanded ? classes.expanded : ""}`}>
                <div className={classes.wrap}>
                    <div className={classes.header}>
                        <h2 className={classes.head}>Filters</h2>
                        <DaterangePicker
                            initialRange={dateRangeFilter}
                            onRangeChange={onRangeChange}
                            externalStyles={classes.pickers}
                            disabled={props.disabled} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Filters;