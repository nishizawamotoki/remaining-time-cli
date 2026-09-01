import {
  endOfWeek,
  endOfMonth,
  endOfYear,
  getDaysInMonth,
  getDaysInYear,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  endOfDay,
} from "date-fns";
import { isWeekday, getFilteredDayCount } from "./date-utils.js";

class Period {
  #now;
  #name;
  #startDate;
  #endDate;
  #dayCount;
  #weekdayCount;
  #weekendCount;

  constructor(now) {
    this.#now = now;
    this.#name = this._defaultName();
    this.#startDate = this._defaultStartDate(now);
    this.#endDate = this._defaultEndDate(now);
    this.#dayCount = this._defaultDayCount(now);
    this.#weekdayCount = this._defaultWeekdayCount(now);
    this.#weekendCount = this._defaultWeekendCount(now);
  }

  get now() {
    return this.#now;
  }

  get name() {
    return this.#name;
  }

  get startDate() {
    return this.#startDate;
  }

  get endDate() {
    return this.#endDate;
  }

  get dayCount() {
    return this.#dayCount;
  }

  get weekdayCount() {
    return this.#weekdayCount;
  }

  get weekendCount() {
    return this.#weekendCount;
  }
}

export class Day extends Period {
  _defaultName() {
    return "day";
  }

  _defaultStartDate(now) {
    return startOfDay(now);
  }

  _defaultEndDate(now) {
    return endOfDay(now);
  }

  _defaultDayCount() {
    return 1;
  }

  _defaultWeekdayCount(now) {
    return isWeekday(now) ? 1 : 0;
  }

  _defaultWeekendCount(now) {
    return isWeekend(now) ? 1 : 0;
  }
}

export class Week extends Period {
  _defaultName() {
    return "week";
  }

  _defaultStartDate(now) {
    return startOfWeek(now, { weekStartsOn: 1 });
  }

  _defaultEndDate(now) {
    return endOfWeek(now, { weekStartsOn: 1 });
  }

  _defaultDayCount() {
    return 7;
  }

  _defaultWeekdayCount() {
    return 5;
  }

  _defaultWeekendCount() {
    return 2;
  }
}

export class Month extends Period {
  _defaultName() {
    return "month";
  }

  _defaultStartDate(now) {
    return startOfMonth(now);
  }

  _defaultEndDate(now) {
    return endOfMonth(now);
  }

  _defaultDayCount(now) {
    return getDaysInMonth(now);
  }

  _defaultWeekdayCount(now) {
    return getFilteredDayCount(startOfMonth(now), endOfMonth(now), isWeekday);
  }

  _defaultWeekendCount(now) {
    return getFilteredDayCount(startOfMonth(now), endOfMonth(now), isWeekend);
  }
}

export class Year extends Period {
  _defaultName() {
    return "year";
  }

  _defaultStartDate(now) {
    return startOfYear(now);
  }

  _defaultEndDate(now) {
    return endOfYear(now);
  }

  _defaultDayCount(now) {
    return getDaysInYear(now);
  }

  _defaultWeekdayCount(now) {
    return getFilteredDayCount(startOfYear(now), endOfYear(now), isWeekday);
  }

  _defaultWeekendCount(now) {
    return getFilteredDayCount(startOfYear(now), endOfYear(now), isWeekend);
  }
}
