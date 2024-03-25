import { Command } from "@commander-js/extra-typings";

import { type ConnectionOptions } from "typeorm";
import { TypeormV2MetadataMapper } from "../src/mapper/typeorm-v2-metadata.mapper";

const program = new Command().option("-c, --config_file <char>").parse();

const opts = program.opts();

async function start(): Promise<void> {
  const connectionOption2 = process.cwd() + "/" + opts.config_file;

  const opt = await import(connectionOption2);

  const mapper = new TypeormV2MetadataMapper(opt.default as ConnectionOptions);
  await mapper.execute();
}

start().catch(
  /* eslint-disable no-console */
  console.error,
);
