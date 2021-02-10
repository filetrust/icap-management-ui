import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import MainTitle from "../../hoc/MainTitle/MainTitle";
import Filters from "./Filters/Filters";
import Main from "../../hoc/Main/Main";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock";
import OutcomePieChart from "./Charts/PieChart/OutcomePieChart";
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

    const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">("LOADING");
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
                console.error("Analytics: " + error);
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

            <Main externalStyles={classes.main}>
                {status === "LOADING" &&
                    <div className={classes.loading}>Loading...</div>
                }

                {status === "LOADED" &&
                    <article className={classes.container}>
                        <div className={classes.innerContent}>
                            <div className={classes.innerTop}>
                                <div className={`${classes.infoBlocks} ${data.totalProcessed < 1 ? classes.noMetrics : ""}`}>
                                    <InfoBlock title={"Total files processed"} sum={data.totalProcessed} />
                                    <InfoBlock title={"Files Submitted to the Non-Compliant File Service"} sum={data.totalSentToNcfs} />
                                </div>


                                <div data-test-id="pieChart">
                                    {data.totalProcessed > 0 &&
                                        <>
                                            <OutcomePieChart data={data.data} />
                                            <h3 className={classes.pieChartTitle}>Files Processed by Outcome</h3>
                                        </>
                                    }
                                </div>

                            </div>

                            {data.totalProcessed < 1 &&
                                <div className={classes.noMetricsFoundMessage}>
                                    No Metrics Found between {
                                        `${analyticsTimeFilter.timestampRangeStart.format("DD/MM/YYYY H:mm A")}
                                        and
                                        ${analyticsTimeFilter.timestampRangeEnd.format("DD/MM/YYYY H:mm A")}`
                                    }
                                </div>
                            }

                            <div data-test-id="lineChart" className={classes.lineChart}>
                                {data.totalProcessed > 0 &&
                                    <>
                                        <h3>Files Processed by Outcome</h3>
                                        <LineChart data={data.data} />
                                    </>
                                }
                            </div>
                        </div>
                    </article>
                }

                {status === "ERROR" &&
                    <div className={classes.loading}>Error Getting Metrics</div>
                }
            </Main>
        </>
    );
}

export default Analytics;