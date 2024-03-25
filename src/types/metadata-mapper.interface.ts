import { type OrmMetadata } from "./metadata.interface";

export interface MetadataMapper {
  execute: () => Promise<OrmMetadata>;
}
