export interface SchemaGenerator {
  generate: () => Promise<void>;
}
