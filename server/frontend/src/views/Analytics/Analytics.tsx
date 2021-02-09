import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import MainTitle from "../../hoc/MainTitle/MainTitle";
import Filters from "./Filters/Filters";
import Main from "../../hoc/Main/Main";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock";
import LineChart from "./Charts/LineChart/LineChart";

import { GlobalStoreContext } from '../../context/globalStore/globalStore-context';
import axiosRequestHelper from "../../helpers/axiosRequestHelper";
import Routes from "../../Routes";

import classes from "./Analytics.module.scss";

const routes = new Routes().analyticsRoutes;

const Analytics = () => {
    const CancelToken = axios.CancelToken;
    const cancellationTokenSource = CancelToken.source();

    const { analyticsTimeFilter } = useContext(GlobalStoreContext);

    const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        setStatus("LOADING");

        const getMetricsAsync = async () => {
            const requestBody = {
                fromDate: analyticsTimeFilter.timestampRangeStart.toDate(),
                toDate: analyticsTimeFilter.timestampRangeEnd.toDate()
            };

            try {
                const response = await axiosRequestHelper(
                    routes.getMetricsRoutes, "POST", cancellationTokenSource.token, requestBody);

                setData(response)

                setStatus("LOADED");
            }
            catch (error) {
                setStatus("ERROR");
                // tslint:disable-next-line: no-console
                console.error("RequestHistory: " + error);
            }
        }

        getMetricsAsync();

        return () => {
            if (status === "LOADING") {
                cancellationTokenSource.cancel();
            }
        }

        // eslint-disable-next-line
    }, [analyticsTimeFilter.timestampRangeStart, analyticsTimeFilter.timestampRangeEnd]);

    return (
        <>
            <MainTitle title="Performance Analytics" />

            <Filters disabled={status === "LOADING"} />

            <Main>
                {status === "LOADING" &&
                    <div>Loading...</div>
                }

                {status === "LOADED" &&
                    <article className={classes.container}>
                        <div className={classes.innerContent}>
                            <div className={classes.innerTop}>
                                <h3>
                                    {
                                        `Transactions From
                                    ${analyticsTimeFilter.timestampRangeStart.format("DD/MM/YYYY H:mm A")}
                                    to
                                    ${analyticsTimeFilter.timestampRangeEnd.format("DD/MM/YYYY H:mm A")}`
                                    }
                                </h3>

                                <div className={classes.infoBlocks}>
                                    <InfoBlock title={"Total files processed"} sum={data.totalProcessed} />
                                    <InfoBlock title={"Files Submitted to the Non-Compliant File Service"} sum={0} />
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
                }

                {status === "ERROR" &&
                    <div>Error Getting Metrics</div>
                }
            </Main>
        </>
    );
}

export default Analytics;