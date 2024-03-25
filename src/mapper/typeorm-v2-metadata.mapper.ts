import { type ColumnType, type NamingStrategyInterface } from "typeorm";
import { type ColumnMetadataArgs } from "typeorm/metadata-args/ColumnMetadataArgs";
import { type MetadataArgsStorage } from "typeorm/metadata-args/MetadataArgsStorage";
import { type TableMetadataArgs } from "typeorm/metadata-args/TableMetadataArgs";
import { type MetadataMapper } from "../types/metadata-mapper.interface";
import {
  type OrmMetadata,
  type PostgreSQLColumnType,
} from "../types/metadata.interface";

export class TypeormV2MetadataMapper implements MetadataMapper {
  constructor(
    private readonly metadata: MetadataArgsStorage,
    private readonly namingStrategy?: NamingStrategyInterface,
  ) {}

  execute(): OrmMetadata {
    return {
      databaseType: "postgresql",
      schemas: this.metadata.tables.map((table) => {
        return {
          tableName: this.getTableName(table),
          schemaName: this.getSchemaName(table.target),
          columns: this.metadata.columns.map((column: ColumnMetadataArgs) => ({
            columnName: this.getColumnName(column),
            propertyName: column.propertyName,
            columnType: this.getColumnType(column.options.type),
            transformer: Array.isArray(column.options.transformer)
              ? column.options.transformer[0]
              : column.options.transformer,
            isNullable: column.options.nullable ?? false,
            isAutoIncrement:
              this.metadata.generations.find(
                (generation) =>
                  generation.target === table.target &&
                  generation.propertyName === column.propertyName,
              )?.strategy === "increment",
          })),
          primaryKey: this.metadata.columns
            .filter((column) => column.options.primary)
            .map((column) => column.propertyName),
          uniqueKeys: [],
        };
      }),
    };
  }

  private getTableName(table: TableMetadataArgs): string {
    if (table.name != null) {
      return table.name;
    }

    if (typeof table.target === "function") {
      return table.target.name;
    }

    if (this.namingStrategy != null) {
      return this.namingStrategy.tableName(table.target, undefined);
    }

    return table.target;
  }

  private getColumnName(column: ColumnMetadataArgs): string {
    if (column.options.name != null) {
      return column.options.name;
    }

    if (this.namingStrategy != null) {
      return this.namingStrategy.columnName(
        column.propertyName,
        column.options.name,
        [],
      );
    }

    return column.propertyName;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private getSchemaName(target: Function | string): string {
    const name = typeof target === "string" ? target : target.name;

    return name.charAt(0).toLowerCase() + name.slice(1) + "Schema";
  }

  private getColumnType(type?: ColumnType): PostgreSQLColumnType {
    if (type == null) {
      return "bigint";
    }
    if (type === Number) {
      return "bigint";
    }
    if (type === String) {
      return "varchar";
    }
    if (type === Date) {
      return "date";
    }
    if (type === Boolean) {
      return "boolean";
    }

    return type as PostgreSQLColumnType;
  }
}
