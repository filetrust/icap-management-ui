import moment from "moment";

const now = moment();
const then = moment().subtract(1, "hour");

export interface RequestHistoryTimeFilter {
	timestampRangeStart: moment.Moment,
	timestampRangeEnd: moment.Moment
}

const requestHistoryTimeFilter: RequestHistoryTimeFilter = {
	timestampRangeStart: then,
	timestampRangeEnd: now,
};

export default requestHistoryTimeFilter;