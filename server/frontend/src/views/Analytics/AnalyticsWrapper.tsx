import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";
import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";
import Analytics from "./Analytics";
import axiosRequestHelper from "../../helpers/axiosRequestHelper";
import Routes from "../../Routes";

const routes = new Routes().analyticsRoutes;

const AnalyticsWrapper = () => {
    const CancelToken = axios.CancelToken;
    const cancellationTokenSource = CancelToken.source();

    const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
    const [data, setData] = useState(null);

    const { analyticsTimeFilter } = useContext(GlobalStoreContext);

    useEffect(() => {
        setStatus("LOADING");

        const getTransactionsAsync = async () => {
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

        getTransactionsAsync();

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

            <Main>
                {status === "LOADING" &&
                    <div>Loading...</div>
                }

                {status === "LOADED" &&
                    <Analytics data={data} />
                }

                {status === "ERROR" &&
                    <div>Error Getting Metrics</div>
                }
            </Main>
        </>
    )
}

export default AnalyticsWrapper;