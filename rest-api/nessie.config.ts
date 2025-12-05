import { ClientPostgreSQL, NessieConfig } from "nessie";
import { config as dbConfig } from "./db/db.ts";

const config: NessieConfig = {
  client: new ClientPostgreSQL(dbConfig),
  migrationFolders: ["./db/migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
