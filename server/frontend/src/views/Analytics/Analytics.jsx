import React, { useState, useContext, useEffect } from "react";
// import { AnalyticsContext } from "../../context/analytics/analytics-context";
import classes from "./Analytics.module.scss";
import LineChart from "../../components/UI/Charts/LineChart/LineChart";
// import PieChart from "../../components/UI/Charts/PieChart/PieChart";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock";
import DaterangePicker from "../../components/UI/DaterangePicker/DaterangePicker";
import { GlobalStoreContext } from '../../context/globalStore/globalStore-context';

const Analytics = ({ data }) => {
    // @ts-ignore
    const { analyticsTimeFilter, updateAnalyticsTimeFilter } = useContext(GlobalStoreContext);

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

    const onRangeChange = (start, end) => {
        setDateRangeFilter({ start, end });
    }

    return (
        <>
            <article className={classes.Analytics}>
                <div className={classes.top}>ICAP requests</div>
                <div className={classes.pickersWrap}>
                    <div className={classes.pickersBlock}>
                        <h3>Filter</h3>
                        <DaterangePicker
                            initialRange={dateRangeFilter}
                            onRangeChange={onRangeChange}
                            externalStyles={classes.pickers}
                        // disabled={props.disabled}
                        />

                        {/*
                                <DaterangePicker
                                externalStyles={classes.pickers}
                                // onChangeChartsData={changeChartData}
                                />
                            */}
                    </div>
                </div>
                <div className={classes.innerContent}>
                    <h3>
                        {`Transactions From ${dateRangeFilter.start.format("DD/MM/YYYY H:mm A")} to ${dateRangeFilter.end.format("DD/MM/YYYY H:mm A")}`}
                    </h3>
                    <div className={classes.innerTop}>
                        <div className={classes.infoBlocks}>
                            <InfoBlock title={"Total files processed"} sum={data.totalProcessed} />
                        </div>

                        {/*
                                <div data-test-id="pieChart">
                                <PieChart rawData={data} />
                                </div>
                            */}
                    </div>
                    <div data-test-id="lineChart" className={classes.lineChart}>
                        {data.totalProcessed > 0 &&
                            <LineChart data={data} />
                        }
                    </div>
                </div>
            </article>
        </>
    );
};

export default Analytics;