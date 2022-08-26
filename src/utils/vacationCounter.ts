import moment from "moment";
moment.locale("pl");

/**
 * Function given a MomentJS object, returns the last friday of the provided month.
 *
 * It has its use in calculating the start of vacation. In Poland, the last friday of June is the beginning of vacation.
 * @param monthMoment - MomentJS object representing the month to calculate the last friday for.
 * @returns {moment.Moment} a MomentJS object representing the last friday of the provided month.
 */
const calculateLastFridayForMonth = (monthMoment: moment.Moment) => {
  const lastDay = monthMoment.endOf("month").startOf("day");
  switch (lastDay.day()) {
    case 6: {
      return lastDay.subtract(1, "days");
    }
    default: {
      return lastDay.subtract(lastDay.day() + 2, "days");
    }
  }
};

/**
 * Function that calculates how long students have to wait for the next vacation.
 * @returns an object containing the total days from start to end of the school year,
 * days left to vacation and a percentage of elapsed time (for usage in a progress bar)
 * or if the vacation is currently in progress returns 0 remaining days and 100% elapsed time.
 */
const calculateVacation = () => {
  const now = moment().utc().local();
  if (now.month() === 6 || now.month() === 7) {
    return { daysTotal: 0, daysLeft: 0, procent: 1 };
  }
  const start = moment().year(now.year()).month(8).date(1).day(8);
  if (start.date() > 7) start.day(-6);
  const end = calculateLastFridayForMonth(
    moment()
      .year(now.year() + 1)
      .month(5)
  );

  const daysTotal = end.diff(start, "days");
  const daysLeft = end.diff(now, "days") + 1;
  const procent = 1 - daysLeft / daysTotal;

  return { daysTotal: daysTotal, daysLeft: daysLeft, procent: procent };
};

export default calculateVacation;
