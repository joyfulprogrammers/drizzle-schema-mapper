import { getMetadataArgsStorage } from "typeorm";
import { type MetadataMapper } from "../types/metadata-mapper.interface";
import { type OrmMetadata } from "../types/metadata.interface";

export class TypeormV2MetadataMapper implements MetadataMapper {
  execute(): OrmMetadata {
    getMetadataArgsStorage();

    return {} as any;
  }
}
