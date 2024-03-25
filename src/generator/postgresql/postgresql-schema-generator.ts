import * as prettier from "prettier";
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

  async generate(): Promise<void> {
    for (const schema of this.metaData.schemas) {
      const writer = this.writerFactory.create(
        `${schema.schemaName}.schema.ts`,
      );

      const importText = this.generateImport(schema);
      const tableText = this.generateTable(schema);
      const text = await prettier.format(`${importText}\n${tableText}`, {
        parser: "babel",
      });

      writer.write(text);
    }
  }

  private generateImport(schema: SchemaMetadata): string {
    if (schema.columns.length === 0) {
      return "";
    }

    const importSet = new Set(
      [
        "pgTable",
        schema.primaryKey != null && "primaryKey",
        ...schema.columns.map((col) => col.columnType),
        schema.columns.some((col) => col.transformer != null) && "customType",
      ].filter(Boolean),
    );

    return `import { ${[...importSet].join(", ")} } from 'drizzle-orm/pg-core';\n`;
  }

  private generateTable(schema: SchemaMetadata): string {
    const columns = schema.columns.map((columnMetadata) => {
      const functions = [
        `${columnMetadata.columnType}('${columnMetadata.columnName}')`,
        columnMetadata.isAutoIncrement && "autoincrement()",
        columnMetadata.isNullable && "notNull()",
      ]
        .filter(Boolean)
        .join(".");

      return `${columnMetadata.propertyName}: ${functions}`;
    });

    const footer =
      schema.primaryKey != null
        ? `,(table) => {
      return {
        primaryKey: primaryKey({
          columns: [${schema.primaryKey.map((column) => `table.${column}`).join(", ")}],
        }),
      }
    }`
        : "";

    return `export const ${schema.schemaName} = pgTable(
      '${schema.tableName}',
      {
        ${columns.join(",\n")}
      }
      ${footer}
    )`;
  }
}
