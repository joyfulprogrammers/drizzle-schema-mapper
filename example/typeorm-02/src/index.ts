import "reflect-metadata";
import { TypeormV2MetadataMapper } from "../../../src/mapper/typeorm-v2-metadata.mapper";

function start(): void {
  // const user = new User();
  // const connection = {
  //   driver: {
  //     options: {
  //       type: "postgres",
  //     },
  //     escape: (name: string) => "",
  //   },
  //   namingStrategy: {
  //     indexName: (tableOrName: string, columns: string[], where?: string) => "",
  //   },
  //   relationLoader: {
  //     enableLazyLoad: () => "",
  //   },
  //   options: {
  //     entityPrefix: "",
  //   },
  // }; /**/
  //
  // const storage = new MetadataArgsStorage();
  // const metadata = (
  //   new EntityMetadataBuilder(connection as any) as any
  // ).createEntityMetadata(storage.filterTables(user as any));

  const mapper = new TypeormV2MetadataMapper();

  mapper.execute();
}

start();
