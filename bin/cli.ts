import { Command } from "@commander-js/extra-typings";

const program = new Command()
  .option("--first")
  .option("-s, --separator <char>")
  .parse();

program.opts();
