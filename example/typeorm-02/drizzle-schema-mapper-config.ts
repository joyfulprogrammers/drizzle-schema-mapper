import { type Configuration } from "../../src/types/configuration.interface";

export default {
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "test",
  password: "test",
  database: "test",
  entities: ["src/entity/**/*.ts"],
} satisfies Configuration;
