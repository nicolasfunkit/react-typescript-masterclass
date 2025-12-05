import { config as readEnv } from "dotenv";
import { ClientOptions } from "postgres";

const { DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = await readEnv({
  safe: true,
});

export const config: ClientOptions = {
  database: DB_NAME,
  hostname: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
};
