import { httpErrors } from "oak";
import { AppRouterContext } from "../../main.ts";
import { getClient } from "../utils.ts";
import { Quack, QuackKeys } from "./model.ts";

export async function listQuack(ctx: AppRouterContext): Promise<Array<Quack>> {
  const client = await getClient(ctx);

  const result = await client.queryObject<Quack>(
    `SELECT * FROM ${QuackKeys.TableName}`,
  );

  client.release();

  return result.rows;
}

export async function createQuack(
  ctx: AppRouterContext,
  data: Partial<Quack>,
): Promise<Quack> {
  if (!data.text || !data.createdBy) {
    throw new httpErrors.BadRequest("Missing data");
  }

  const client = await getClient(ctx);

  const result = await client.queryObject<Quack>({
    text:
      `INSERT INTO ${QuackKeys.TableName} (${QuackKeys.ColText}, ${QuackKeys.ColCreatedBy}) VALUES ($1, $2) RETURNING *`,
    args: [
      data.text,
      data.createdBy,
    ],
  });

  client.release();

  return result.rows[0];
}

export async function readQuack(
  ctx: AppRouterContext,
  id: Quack["id"],
): Promise<Quack | null> {
  const client = await getClient(ctx);

  const result = await client.queryObject<Quack>({
    text:
      `SELECT * FROM ${QuackKeys.TableName} WHERE ${QuackKeys.ColId} = $1 LIMIT 1`,
    args: [id],
  });

  client.release();

  if (result.rows?.[0]?.id !== id) {
    return null;
  }

  return result.rows[0];
}

export async function updateQuack(
  ctx: AppRouterContext,
  id: Quack["id"],
  data: Partial<Quack>,
): Promise<Quack> {
  if (!data.text) {
    throw new httpErrors.BadRequest("Missing data");
  }

  const client = await getClient(ctx);

  const result = await client.queryObject<Quack>({
    text:
      `UPDATE ${QuackKeys.TableName} SET ${QuackKeys.ColText} = $1 WHERE ${QuackKeys.ColId} = $2 RETURNING *`,
    args: [
      data.text,
      id,
    ],
  });

  client.release();

  return result.rows[0];
}

export async function deleteQuack(
  ctx: AppRouterContext,
  id: Quack["id"],
): Promise<void> {
  const client = await getClient(ctx);

  await client.queryObject({
    text: `DELETE FROM ${QuackKeys.TableName} WHERE ${QuackKeys.ColId} = $1`,
    args: [id],
  });

  client.release();
}
