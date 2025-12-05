import { AbstractMigration, ClientPostgreSQL } from "nessie";

export default class extends AbstractMigration<ClientPostgreSQL> {
  async up(): Promise<void> {
    await this.client.queryArray(`CREATE TABLE duck (
        id VARCHAR(30) PRIMARY KEY, 
        username VARCHAR(40) UNIQUE, 
        password VARCHAR(60)
    )`);
  }

  async down(): Promise<void> {
    await this.client.queryArray(`DROP TABLE duck`);
  }
}
