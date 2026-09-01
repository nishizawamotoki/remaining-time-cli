import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Day, Week, Month, Year } from "./period.js";
import { Hourly, Daily } from "./time-unit.js";
import {
  WeekdayTimeCalculator,
  WeekendTimeCalculator,
  TotalTimeCalculator,
} from "./time-calculator.js";
import { TimeVisualizer } from "./time-visualizer.js";

export default class App {
  #period;
  #timeUnit;
  #timeCalculator;
  #isHideCells;

  constructor(argv) {
    const options = this.#buildOptions(argv);
    this.#isHideCells = options.hideCells;
    const blockHoursPerDay = options.blockHours;

    const now = new Date();
    switch (options.period) {
      case "day":
        this.#period = new Day(now);
        break;
      case "week":
        this.#period = new Week(now);
        break;
      case "month":
        this.#period = new Month(now);
        break;
      case "year":
        this.#period = new Year(now);
        break;
    }
    switch (options.unit) {
      case "hour":
        this.#timeUnit = new Hourly();
        break;
      case "day":
        this.#timeUnit = new Daily();
        break;
    }

    const timeCalculatorArgs = {
      period: this.#period,
      timeUnit: this.#timeUnit,
      blockHoursPerDay: blockHoursPerDay ?? 0,
    };
    switch (options.filter) {
      case "weekday":
        this.#timeCalculator = new WeekdayTimeCalculator(timeCalculatorArgs);
        break;
      case "weekend":
        this.#timeCalculator = new WeekendTimeCalculator(timeCalculatorArgs);
        break;
      default:
        this.#timeCalculator = new TotalTimeCalculator(timeCalculatorArgs);
    }
  }

  run() {
    const totalTime = this.#timeCalculator.totalTime;
    const elapsedTime = this.#timeCalculator.elapsedTime;
    const scheduledBlockHours =
      this.#timeCalculator.totalBlockHoursFromTomorrow;
    const remainingTime = totalTime - elapsedTime - scheduledBlockHours;

    console.log(`This ${this.#period.name}'s remaining time...`);

    if (totalTime > 0 && this.#isHideCells === undefined) {
      new TimeVisualizer({
        totalTime,
        elapsedTime,
        remainingTime,
        scheduledBlockHours,
        unitName: this.#timeUnit.name,
      }).run();
    }

    console.log(`${remainingTime} ${this.#timeUnit.name}s remaining.`);
  }

  #buildOptions(argv) {
    const options = yargs(hideBin(argv))
      .options({
        p: {
          alias: "period",
          default: "week",
          choices: ["day", "week", "month", "year"],
          type: "string",
        },
        u: {
          alias: "unit",
          choices: ["hour", "day"],
          type: "string",
        },
        f: {
          alias: "filter",
          choices: ["weekday", "weekend"],
          type: "string",
        },
        h: {
          alias: "hide-cells",
          type: "boolean",
        },
        b: {
          alias: "block-hours",
          type: "number",
        },
      })
      .check((argv) => {
        if (Array.isArray(argv.p)) {
          throw new Error("--period can only be specified once.");
        }
        if (Array.isArray(argv.u)) {
          throw new Error("--unit can only be specified once.");
        }
        if (Array.isArray(argv.f)) {
          throw new Error("--filter can only be specified once.");
        }

        if (argv.b !== undefined) {
          const msg = "--block-hours must be an integer from 1 to 24.";
          if (Number.isNaN(argv.b) || !Number.isInteger(argv.b)) {
            throw new Error(msg);
          }

          if (argv.b < 1 || 24 < argv.b) {
            throw new Error(msg);
          }
        }

        return true;
      })
      .detectLocale(false)
      .parse();

    if (options.unit === undefined) {
      options.unit = options.period === "year" ? "day" : "hour";
    }

    // options.unit のデフォルト値を後で設定しているため、.check の中で書けない
    if (options.unit === "day" && options.blockHours !== undefined) {
      console.error("--block-hours cannot be used with --unit day.");
      process.exit(1);
    }

    return options;
  }
}
