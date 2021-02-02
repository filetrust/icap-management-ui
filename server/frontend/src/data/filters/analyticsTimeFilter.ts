import moment from "moment";

const now = moment();
const then = moment().subtract(1, "hour");

export interface AnalyticsTimeFilter {
    timestampRangeStart: moment.Moment,
    timestampRangeEnd: moment.Moment
}

const analyticsTimeFilter : AnalyticsTimeFilter = {
    timestampRangeStart: then,
    timestampRangeEnd: now,
}

export default analyticsTimeFilter;