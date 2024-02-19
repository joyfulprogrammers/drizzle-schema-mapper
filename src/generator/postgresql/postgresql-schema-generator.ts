import { type SchemaGenerator } from "../../types/generator.interface";
import {
  type OrmMetadata,
  type SchemaMetadata,
} from "../../types/metadata.interface";
import { type WriterFactory } from "../../types/writer.interface";

export class PostgresqlSchemaGenerator implements SchemaGenerator {
  constructor(
    private readonly writerFactory: WriterFactory,
    private readonly metaData: OrmMetadata,
  ) {}

  generate(): void {
    this.metaData.schemas.forEach((schema) => {
      const writer = this.writerFactory.create(
        `${schema.schemaName}.schema.ts`,
      );

      const importText = this.generateImport(schema);
      writer.write(importText);
    });
  }

  private generateImport(schema: SchemaMetadata): string {
    if (schema.columns.length === 0) {
      return "";
    }

    const imports = [
      "pgTable",
      schema.primaryKey != null && "primaryKey",
      ...schema.columns.map((col) => col.columnType),
      schema.columns.find((c) => c.columnType === "customType")?.columnType,
    ]
      .filter(Boolean)
      .join(", ");

    return `import { ${imports} } from 'drizzle-orm/pg-core';\n`;
  }
}
