import { beforeEach, describe, expect, test } from "vitest";
import { PostgresqlSchemaGenerator } from "../../../src/generator/postgresql/postgresql-schema-generator";
import { type OrmMetadata } from "../../../src/types/metadata.interface";
import { StubWriter } from "../../writer/stub-writer";

describe("PostgresqlSchemaGenerator", () => {
  const writer = new StubWriter();
  const factory = (metadata: OrmMetadata): PostgresqlSchemaGenerator => {
    return new PostgresqlSchemaGenerator({ create: () => writer }, metadata);
  };

  beforeEach(() => {
    writer.clear();
  });

  test("should do nothing if there is no schema", () => {
    // given
    const ormMetadata: OrmMetadata = {
      databaseType: "pg",
      schemas: [],
    };

    // when
    factory(ormMetadata).generate();

    // then
    expect(writer.result).toBeUndefined();
  });

  test("should include column type import", () => {
    // given
    const ormMetadata: OrmMetadata = {
      databaseType: "pg",
      schemas: [
        {
          tableName: "users",
          schemaName: "user",
          columns: [
            {
              columnName: "id",
              propertyName: "id",
              columnType: "bigserial",
              isNullable: false,
              isAutoIncrement: true,
            },
            {
              columnName: "name",
              propertyName: "name",
              columnType: "varchar",
              isNullable: false,
              isAutoIncrement: true,
            },
          ],
          primaryKey: {
            name: "pk_users",
            columns: ["id"],
          },
          uniqueKeys: [],
        },
      ],
    };

    // when
    factory(ormMetadata).generate();

    // then
    expect(writer.result).toMatchInlineSnapshot(`
      "import { pgTable, primaryKey, bigserial, varchar } from 'drizzle-orm/pg-core';
      "
    `);
  });
});