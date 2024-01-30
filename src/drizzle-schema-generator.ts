import { type OrmMetadata } from "./types/metadata";
import { type Writer } from "./writer/writer";

export class DrizzleSchemaGenerator {
  constructor(
    private readonly writer: Writer,
    private readonly metaData: OrmMetadata,
  ) {}

  generate(): void {
    // generate 해서 writer 한다.
    // generate => 다른 곳?
    // TableSchemaGenerator: table 정보 받아서 정보를 반환
    // -- ColumnSchemaGenerator: column 정보 받아서 정보를 반환
    // -- ConstraintsSchemaGenerator: constraint 정보 받아서 정보를 반환

    this.metaData.schemas.forEach((schema) => {
      // schema.columns;
      // const visitor = new SomeVisitor();
      // const result = visitor.visit(schema);
      //
      // schema.accept(visitor);
      //
      // this.writer.write(result);
    });
  }
}
