export type Configuration = PostgresConfiguration | MysqlConfiguration;

export interface PostgresConfiguration {
  type: "postgres";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
}

export type MysqlConfiguration = PostgresConfiguration;
