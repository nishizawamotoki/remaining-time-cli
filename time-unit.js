import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInWeekdayHours,
  differenceInWeekendHours,
  differenceInWeekdayDays,
  differenceInWeekendDays,
} from "./date-utils.js";

class TimeUnit {
  #name;
  #unitsPerDay;
  #differenceInTime;
  #differenceInWeekdayTime;
  #differenceInWeekendTime;

  constructor() {
    this.#name = this._defaultName();
    this.#unitsPerDay = this._defaultUnitsPerDay();
    this.#differenceInTime = this._defaultDifferenceInTime();
    this.#differenceInWeekdayTime = this._defaultDifferenceInWeekdayTime();
    this.#differenceInWeekendTime = this._defaultDifferenceInWeekendTime();
  }

  get name() {
    return this.#name;
  }

  get unitsPerDay() {
    return this.#unitsPerDay;
  }

  get differenceInTime() {
    return this.#differenceInTime;
  }

  get differenceInWeekdayTime() {
    return this.#differenceInWeekdayTime;
  }

  get differenceInWeekendTime() {
    return this.#differenceInWeekendTime;
  }
}

export class Hourly extends TimeUnit {
  _defaultName() {
    return "hour";
  }

  _defaultUnitsPerDay() {
    return 24;
  }

  _defaultDifferenceInTime() {
    return differenceInHours;
  }

  _defaultDifferenceInWeekdayTime() {
    return differenceInWeekdayHours;
  }

  _defaultDifferenceInWeekendTime() {
    return differenceInWeekendHours;
  }
}

export class Daily extends TimeUnit {
  _defaultName() {
    return "day";
  }

  _defaultUnitsPerDay() {
    return 1;
  }

  _defaultDifferenceInTime() {
    return differenceInCalendarDays;
  }

  _defaultDifferenceInWeekdayTime() {
    return differenceInWeekdayDays;
  }

  _defaultDifferenceInWeekendTime() {
    return differenceInWeekendDays;
  }
}
