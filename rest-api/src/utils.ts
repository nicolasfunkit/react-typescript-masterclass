import { httpErrors, Status } from "oak";
import { PoolClient } from "postgres";
import { jwtVerify } from "jose";
import {
  AppContext,
  AppJwtPayload,
  AppJwtResult,
  AppRouterContext,
} from "../main.ts";

export function createResponse(
  ctx: AppContext,
  status: Status,
  data: Record<string, unknown> = {},
  errorMessage?: string,
) {
  ctx.response.type = "json";
  ctx.response.status = status;
  ctx.response.body = {
    error: errorMessage,
    data,
  };
}

export function createOkResponse(
  ctx: AppContext,
  data: Record<string, unknown> = {},
) {
  createResponse(ctx, Status.OK, data);
}

export function createErrorResponse(
  ctx: AppContext,
  errorMessage: string,
  errorCode: Status = Status.InternalServerError,
) {
  createResponse(ctx, errorCode, {}, errorMessage);
}

export function getClient(ctx: AppRouterContext): Promise<PoolClient> {
  return ctx.app.state.pool.connect();
}

// deno-lint-ignore no-explicit-any
export async function getReqBody<T extends Record<string, any>>(
  ctx: AppContext,
): Promise<T> {
  return await ctx.request.body({ type: "json" }).value;
}

export function getParamFromPath(ctx: AppRouterContext, key = "id"): string {
  const value = ctx.params[key];

  if (!value) throw new httpErrors.BadRequest(`Missing ${key} in path`);

  return value;
}

export function getParamIntFromPath(ctx: AppRouterContext, key = "id"): number {
  const value = parseInt(getParamFromPath(ctx, key));

  if (isNaN(value)) throw new httpErrors.BadRequest(`Invalid ${key} in path`);

  return value;
}

export const jwtKey = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function getJwtPayload(ctx: AppContext): Promise<AppJwtPayload> {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader || authHeader.length < 8) {
    throw new httpErrors.Unauthorized();
  }

  const authHeaderArray = authHeader.split("Bearer ");

  if (authHeaderArray.length !== 2) {
    throw new httpErrors.Unauthorized();
  }

  const jwt = authHeaderArray[1];

  const payload = await jwtVerify(jwt, jwtKey) as AppJwtResult;

  if (!payload.payload.did) {
    throw new httpErrors.Unauthorized();
  }

  return payload.payload;
}
