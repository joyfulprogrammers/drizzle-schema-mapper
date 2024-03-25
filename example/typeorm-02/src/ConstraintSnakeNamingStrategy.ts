import { Table } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export class ConstraintSnakeNamingStrategy extends SnakeNamingStrategy {
  override primaryKeyName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join("_");

    return `pk_${table}_${columnsSnakeCase}`;
  }

  override indexName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join("_");

    return `${table}_${columnsSnakeCase}_index`;
  }

  override uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join("_");

    return `${table}_${columnsSnakeCase}_unique`;
  }
}
