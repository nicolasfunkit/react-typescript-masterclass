import { httpErrors } from "oak";
import { cuid } from "cuid";
import { compare as verifyPassword, hash as hashPassword } from "bcrypt";
import type { AppRouterContext } from "../../main.ts";
import { getClient } from "../utils.ts";
import { Duck, DuckKeys } from "./model.ts";

export async function createDuck(
  ctx: AppRouterContext,
  data: Partial<Duck>,
): Promise<Duck> {
  if (!data.username) {
    throw new httpErrors.BadRequest("Username is missing from data");
  }
  if (!data.password) {
    throw new httpErrors.BadRequest("Password is missing from data");
  }

  const id = cuid();
  const hashedPassword = await hashPassword(data.password);

  const client = await getClient(ctx);

  const result = await client.queryObject<Duck>({
    text:
      `INSERT INTO ${DuckKeys.TableName} (${DuckKeys.ColId}, ${DuckKeys.ColUsername}, ${DuckKeys.ColPassword}) VALUES ($1, $2, $3) RETURNING *`,
    args: [id, data.username, hashedPassword],
  });

  client.release();

  return result.rows[0] as Duck;
}

export async function readDuck(
  ctx: AppRouterContext,
  id: Duck["id"],
): Promise<Duck | null> {
  const client = await getClient(ctx);

  const result = await client.queryObject<Duck>({
    text:
      `SELECT * FROM ${DuckKeys.TableName} WHERE ${DuckKeys.ColId} = $1 LIMIT 1`,
    args: [id],
  });

  client.release();

  if (result.rows?.[0]?.id !== id) {
    return null;
  }

  return result.rows[0] as Duck;
}

export async function updateDuck(
  ctx: AppRouterContext,
  id: Duck["id"],
  data: Partial<Duck>,
): Promise<Duck> {
  if (!data.username && !data.password) {
    throw new httpErrors.BadRequest();
  }

  const record = await readDuck(ctx, id);

  if (!record) throw new httpErrors.NotFound();

  const username = data.username ?? record.username;
  const password = data.password
    ? hashPassword(data.password)
    : record.password;

  const client = await getClient(ctx);

  const updatedRecords = await client.queryObject<Duck>({
    text:
      `UPDATE ${DuckKeys.TableName} SET ${DuckKeys.ColUsername} = $1, ${DuckKeys.ColPassword} = $2 WHERE ${DuckKeys.ColId} = $3 RETURNING *`,
    args: [
      username,
      password,
      record.id,
    ],
  });

  client.release();

  return updatedRecords.rows[0];
}

export async function deleteDuck(
  ctx: AppRouterContext,
  id: Duck["id"],
): Promise<void> {
  const client = await getClient(ctx);

  await client.queryArray({
    text: `DELETE FROM ${DuckKeys.TableName} WHERE ${DuckKeys.ColId} = $1`,
    args: [id],
  });

  client.release();
}

export async function getByUsername(
  ctx: AppRouterContext,
  username: Duck["username"],
): Promise<Duck | null> {
  const client = await getClient(ctx);

  const result = await client.queryObject<Duck>({
    text:
      `SELECT * FROM ${DuckKeys.TableName} WHERE ${DuckKeys.ColUsername} = $1 LIMIT 1`,
    args: [username],
  });

  client.release();

  if (result.rows?.[0]?.username !== username) {
    return null;
  }

  return result.rows[0] as Duck;
}

export async function verifyLogin(
  ctx: AppRouterContext,
  data: Partial<Duck>,
): Promise<Duck> {
  if (!data.username) {
    throw new httpErrors.BadRequest("Username is missing from data");
  }
  if (!data.password) {
    throw new httpErrors.BadRequest("Password is missing from data");
  }

  const duck = await getByUsername(ctx, data.username);

  if (!duck) {
    throw new httpErrors.NotFound("Duck not found");
  }

  const isValid = await verifyPassword(data.password, duck.password);

  if (!isValid) {
    throw new httpErrors.Unauthorized();
  }

  return duck;
}
