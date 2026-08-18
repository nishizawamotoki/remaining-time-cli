## remaining-time-cli

A CLI tool that displays the remaining time for a specified period.

## Installation

```
npm install remaining-time-cli
```

```
npx remaining
```

## Usage

### `-p=<type>`, `--period=<type>`

Specifies the period to display. The available values are `day`, `week`, `month`, or `year`. The default is `week`. The week starts on Monday.

### `-u=<type>`, `--unit=<type>`

Specifies the time unit. The available values are `hour` or `day`. The default is `hour`, except for `-p year`, which defaults to `day`.

### `-f=<type>`, `--filter=<type>`

Limits the period to weekdays or weekends. The available values are `weekday` or `weekend`.

### `-b=<hours-per-day>`, `--block=<hours-per-day>`

Blocks unavailable time from the following day onward (i.e., subtracts unavailable time from the remaining time). Blocked time is displayed as colored cells. `<hours-per-day>` is the number of unavailable hours per day. This option cannot be used with `-u day`.

### `-h`, `--hide-cells`

Hides the cell-based visualization.

## Examples

All examples below are based on the current time of 15:00 on August 26, 2026.

Display the remaining time for this week (August 24–30).

```
$ remaining
This week's remaining time...

■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □ □

□ = 1 hour

105 hours remaining.

```

Display the remaining time for weekdays this week.

```
$ remaining -f weekday
This week's remaining time...

■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ □ □ □
□ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □

□ = 1 hour

57 hours remaining.

```

Display the remaining time for weekdays this week, assuming 8 hours of unavailable time per day from tomorrow onward.

**Note:** In the actual output, blocked time is displayed as colored cells.

```
$ remaining -f weekday -b 8
This week's remaining time...

■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■ ■ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □ □ □

□ = 1 hour

41 hours remaining.

```

Display the remaining days this month.

```
remaining -p month -u day
This month's remaining time...

■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■
■ ■ ■ ■ ■ ■
■ □ □ □ □ □
□

□ = 1 day

6 days remaining.

```

## Acknowledgements

Inspired by Tim Urban's TED Talk, "Inside the mind of a master procrastinator"
[Inside the mind of a master procrastinator - TED](https://www.ted.com/talks/tim_urban_inside_the_mind_of_a_master_procrastinator)
