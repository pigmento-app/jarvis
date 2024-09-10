import { DataSource } from "typeorm";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "jarvis_postgres",
  port: 5432,
  username: "user",
  password: "password",
  database: "db_jarvis",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
