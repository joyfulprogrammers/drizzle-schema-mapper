import { type ConnectionOptions, createConnection } from "typeorm";
import { type MetadataMapper } from "../types/metadata-mapper.interface";
import { type OrmMetadata } from "../types/metadata.interface";

export class TypeormV2MetadataMapper implements MetadataMapper {
  constructor(private readonly config: ConnectionOptions) {}

  async execute(): Promise<OrmMetadata> {
    const connection = await createConnection(this.config);
    await connection.close();

    // const metadata = getMetadataArgsStorage();

    return {} as any;
  }
}
