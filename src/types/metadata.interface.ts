export interface OrmMetadata {
  databaseType: "pg";
  schemas: SchemaMetadata[];
}

export interface SchemaMetadata {
  tableName: string;
  schemaName: string;
  columns: ColumnMetadata[];
  primaryKey?: ConstraintMetadata;
  uniqueKeys: ConstraintMetadata[];
}

export interface ConstraintMetadata {
  name: string;
  columns: string[];
}

export interface ColumnMetadata {
  columnName: string;
  propertyName: string;
  columnType: PostgreSQLColumnType | MySQLColumnType;
  transformer?: ColumnTransformer<any, any>;
  isNullable: boolean;
  isAutoIncrement: boolean;
}

export interface ColumnTransformer<DatabaseValue, EntityValue> {
  to: (value: EntityValue) => DatabaseValue;
  from: (databaseValue: DatabaseValue) => EntityValue;
}

export type MySQLColumnType =
  | "bigint"
  | "binary"
  | "boolean"
  | "char"
  | "date"
  | "datetime"
  | "decimal"
  | "double"
  | "enum"
  | "float"
  | "int"
  | "json"
  | "mediumint"
  | "real"
  | "serial"
  | "smallint"
  | "text"
  | "time"
  | "timestamp"
  | "tinyint"
  | "varbinary"
  | "varchar"
  | "year";

export type PostgreSQLColumnType =
  | "bigint"
  | "date"
  | "jsonb"
  | "text"
  | "bigserial"
  | "doublePrecision"
  | "macaddr"
  | "time"
  | "boolean"
  | "enum"
  | "macaddr8"
  | "timestamp"
  | "char"
  | "numeric"
  | "uuid"
  | "cidr"
  | "inet"
  | "real"
  | "varchar"
  | "integer"
  | "serial"
  | "interval"
  | "smallint"
  | "json"
  | "smallserial";
