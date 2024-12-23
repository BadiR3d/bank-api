import { DataSource } from "typeorm";
import { Account } from "../entities/Account";
import { ENVIRONMENT } from "./globals";

const { DATABASE } = ENVIRONMENT

const config = new DataSource({
  type: "mysql",
  host: DATABASE.HOST,
  port: Number(DATABASE.PORT),
  username: DATABASE.USERNAME,
  password: DATABASE.PASSWORD,
  database: DATABASE.NAME,
  entities: [Account],
  synchronize: true,
});

export default config;
