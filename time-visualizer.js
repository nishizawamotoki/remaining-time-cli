export class TimeVisualizer {
  #totalTime;
  #elapsedTime;
  #remainingTime;
  #scheduledBlockHours;
  #unitName;

  constructor(args) {
    this.#totalTime = args.totalTime;
    this.#elapsedTime = args.elapsedTime;
    this.#remainingTime = args.remainingTime;
    this.#scheduledBlockHours = args.scheduledBlockHours;
    this.#unitName = args.unitName;
  }

  run() {
    const allCells = [
      ...Array(this.#elapsedTime).fill("■"),
      ...Array(this.#scheduledBlockHours).fill("\x1b[34m■\x1b[0m"),
      ...Array(this.#remainingTime).fill("□"),
    ];
    const cellCountPerRow = Math.ceil(Math.sqrt(this.#totalTime));

    console.log();
    allCells.forEach((cell, i) => {
      process.stdout.write(cell);
      if ((i + 1) % cellCountPerRow === 0 || i + 1 === this.#totalTime) {
        process.stdout.write("\n");
      } else {
        process.stdout.write(" ");
      }
    });
    console.log(`\n□ = 1 ${this.#unitName}`);
    console.log();
  }
}
