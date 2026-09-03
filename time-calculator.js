import {
  differenceInCalendarDays,
  differenceInWeekdayDays,
  differenceInWeekendDays,
  startOfNextDay,
} from "./date-utils.js";

class TimeCalculator {
  #period;
  #timeUnit;
  #blockHoursPerDay;
  #periodDayCount;
  #differenceInTime;
  #differenceInDays;

  constructor(args) {
    this.#period = args.period;
    this.#timeUnit = args.timeUnit;
    this.#blockHoursPerDay = args.blockHoursPerDay;
    this.#periodDayCount = this._defaultPeriodDayCount(args.period);
    this.#differenceInTime = this._defaultDifferenceInTime(args.timeUnit);
    this.#differenceInDays = this._defaultDifferenceInDays();
  }

  get totalTime() {
    return this.#periodDayCount * this.#timeUnit.unitsPerDay;
  }

  get elapsedTime() {
    return this.#differenceInTime(this.#period.now, this.#period.startDate);
  }

  get totalBlockHoursFromTomorrow() {
    return (
      this.#differenceInDays(
        startOfNextDay(this.#period.endDate),
        startOfNextDay(this.#period.now),
      ) * this.#blockHoursPerDay
    );
  }
}

export class WeekdayTimeCalculator extends TimeCalculator {
  _defaultPeriodDayCount(period) {
    return period.weekdayCount;
  }

  _defaultDifferenceInTime(timeUnit) {
    return timeUnit.differenceInWeekdayTime;
  }

  _defaultDifferenceInDays() {
    return differenceInWeekdayDays;
  }
}

export class WeekendTimeCalculator extends TimeCalculator {
  _defaultPeriodDayCount(period) {
    return period.weekendCount;
  }

  _defaultDifferenceInTime(timeUnit) {
    return timeUnit.differenceInWeekendTime;
  }

  _defaultDifferenceInDays() {
    return differenceInWeekendDays;
  }
}

export class TotalTimeCalculator extends TimeCalculator {
  _defaultPeriodDayCount(period) {
    return period.dayCount;
  }

  _defaultDifferenceInTime(timeUnit) {
    return timeUnit.differenceInTime;
  }

  _defaultDifferenceInDays() {
    return differenceInCalendarDays;
  }
}
