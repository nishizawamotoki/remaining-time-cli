import {
  addDays,
  compareAsc,
  differenceInBusinessDays,
  differenceInCalendarDays as dateFnsDifferenceInCalendarDays,
  differenceInHours as dateFnsDifferenceInHours,
  eachDayOfInterval,
  isSameDay,
  isWeekend,
  startOfDay,
} from "date-fns";

export function isWeekday(date) {
  return !isWeekend(date);
}

export function startOfNextDay(date) {
  return startOfDay(addDays(date, 1));
}

export function getFilteredDayCount(startDate, endDate, dateFilter) {
  const interval = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  return interval.filter(dateFilter).length;
}

export function differenceInCalendarDays(laterDate, earlierDate) {
  validateDateOrder(laterDate, earlierDate);
  return dateFnsDifferenceInCalendarDays(laterDate, earlierDate);
}

export function differenceInHours(laterDate, earlierDate) {
  validateDateOrder(laterDate, earlierDate);
  return dateFnsDifferenceInHours(laterDate, earlierDate);
}

// earlierDate の分・秒は切り上げ、laterDate の分・秒は切り捨てて計算しているため differenceInHours の結果と異なる場合がある
// differenceInHoursOfMatchingDay(new Date(2026, 7, 18, 2, 30), new Date(2026, 7, 17, 2, 30), isWeekday) → 23
// differenceInHours(new Date(2026, 7, 18, 2, 30), new Date(2026, 7, 17, 2, 30)) → 24
export function differenceInHoursOfMatchingDay(
  laterDate,
  earlierDate,
  dateFilter,
) {
  validateDateOrder(laterDate, earlierDate);

  let totalHours = 0;
  let currentDate = earlierDate;

  while (currentDate < laterDate) {
    if (dateFilter(currentDate)) {
      totalHours += differenceInHours(
        Math.min(laterDate, startOfNextDay(currentDate)),
        currentDate,
      );
    }
    currentDate = startOfNextDay(currentDate);
  }

  return totalHours;
}

export function differenceInWeekdayDays(laterDate, earlierDate) {
  validateDateOrder(laterDate, earlierDate);
  return differenceInBusinessDays(laterDate, earlierDate);
}

export function differenceInWeekendDays(laterDate, earlierDate) {
  validateDateOrder(laterDate, earlierDate);

  // differenceInBusinessDays のロジックを参考に実装
  // https://github.com/date-fns/date-fns/blob/8aa0373ece55184e7817d4a3bbeee65eab3f267c/pkgs/core/src/differenceInBusinessDays/index.ts
  const weekendDaysPerOneWeek = 2;
  const diff = differenceInCalendarDays(laterDate, earlierDate);
  const weeks = Math.trunc(diff / 7);

  let result = weeks * weekendDaysPerOneWeek;
  let movingDate = addDays(earlierDate, weeks * 7);
  while (!isSameDay(laterDate, movingDate)) {
    result += isWeekend(movingDate) ? 1 : 0;
    movingDate = addDays(movingDate, 1);
  }
  return result;
}

function validateDateOrder(later, earlier) {
  if (compareAsc(later, earlier) === -1) {
    throw new Error("laterDate must be later than or equal to earlierDate");
  }
}
