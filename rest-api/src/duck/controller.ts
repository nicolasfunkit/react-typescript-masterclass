import { httpErrors } from "oak";
import { SignJWT } from "jose";
import { AppRouterMiddleware } from "../../main.ts";
import {
  createOkResponse,
  getJwtPayload,
  getParamFromPath,
  getReqBody,
  jwtKey,
} from "../utils.ts";
import { Duck } from "./model.ts";
import * as duckService from "./service.ts";

export const createDuck: AppRouterMiddleware = async (ctx) => {
  const body = await getReqBody(ctx);

  const duck = await duckService.createDuck(ctx, body);

  createOkResponse(ctx, { duck });
};

export const readDuck: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);
  const id = getParamFromPath(ctx);

  if (id !== did) {
    throw new httpErrors.Unauthorized();
  }

  const duck = await duckService.readDuck(ctx, id);

  createOkResponse(ctx, { duck });
};

export const updateDuck: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);
  const id = getParamFromPath(ctx);

  if (id !== did) {
    throw new httpErrors.Unauthorized();
  }

  const body = await getReqBody(ctx);

  const duck = await duckService.updateDuck(ctx, id, body);

  createOkResponse(ctx, { duck });
};

export const deleteDuck: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);
  const id = getParamFromPath(ctx);

  if (id !== did) {
    throw new httpErrors.Unauthorized();
  }

  await duckService.deleteDuck(ctx, id);

  createOkResponse(ctx);
};

export const login: AppRouterMiddleware = async (ctx) => {
  const body = await getReqBody<Partial<Duck>>(ctx);

  const duck = await duckService.verifyLogin(ctx, body);

  const jwt = await new SignJWT({ did: duck.id })
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(jwtKey);

  createOkResponse(ctx, { jwt, id: duck.id });
};
