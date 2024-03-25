import { type OrmMetadata } from "./metadata.interface";

export interface MetadataMapper {
  execute: (originMetadata: any) => OrmMetadata;
}
