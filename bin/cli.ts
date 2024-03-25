import { Command } from "@commander-js/extra-typings";

const program = new Command().option("-c, --config_file <char>").parse();

const opts = program.opts();

async function start(): Promise<void> {
  const connectionOption2 = process.cwd() + "/" + opts.config_file;

  await import(connectionOption2);

  // mapper.execute();
}

start().catch(
  /* eslint-disable no-console */
  console.error,
);
