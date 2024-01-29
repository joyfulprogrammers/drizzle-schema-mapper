export interface ColumnTransformer<DatabaseValue, EntityValue> {
  to: (value: EntityValue) => DatabaseValue;
  from: (databaseValue: DatabaseValue) => EntityValue;
}

export interface ColumnMetadata {
  columnName: string;
  propertyName: string;
  columnType: string;
  transformer: ColumnTransformer<any, any>;
  isNullable: boolean;
  isAutoIncrement: boolean;
}

export interface ConstraintMetadata {
  name: string;
  columns: string[];
}

export interface SchemaMetadata {
  tableName: string;
  schemaName: string;
  columns: ColumnMetadata[];
  primaryKey: ConstraintMetadata;
  uniqueKeys: ConstraintMetadata[];
}

export interface OrmMetadata {
  databaseType: "pg";
  schemas: SchemaMetadata[];
}
