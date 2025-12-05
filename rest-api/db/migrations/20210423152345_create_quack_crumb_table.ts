import { AbstractMigration, ClientPostgreSQL } from "nessie";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`BEGIN TRANSACTION`);

    try {
      await this.client.queryArray(`CREATE TABLE quack (
        id SERIAL PRIMARY KEY, 
        text VARCHAR(255),
        created_by VARCHAR(30) REFERENCES duck(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()::TIMESTAMP(0)
        )`);

      await this.client.queryArray(`CREATE TABLE crumb (
          duck_id VARCHAR(30) REFERENCES duck(id) ON DELETE CASCADE, 
          quack_id INTEGER REFERENCES quack(id) ON DELETE CASCADE,
          UNIQUE(duck_id, quack_id)
          )`);

      await this.client.queryArray(`COMMIT TRANSACTION`);
    } catch (e) {
      await this.client.queryArray(`ROLLBACK TRANSACTION`);
      throw e;
    }
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(`DROP TABLE crumb, quack`);
  }
}
