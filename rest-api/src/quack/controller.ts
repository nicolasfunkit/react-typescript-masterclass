import { httpErrors } from "oak";
import type { AppRouterMiddleware } from "../../main.ts";
import type { Quack } from "./model.ts";
import * as quackService from "./service.ts";
import {
  createOkResponse,
  getJwtPayload,
  getParamIntFromPath,
  getReqBody,
} from "../utils.ts";

export const listQuacks: AppRouterMiddleware = async (ctx) => {
  const quacks = await quackService.listQuack(ctx);

  createOkResponse(ctx, { quacks });
};

export const createQuack: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);

  const body = await getReqBody<Partial<Quack>>(ctx);

  body.createdBy = did;

  const quack = await quackService.createQuack(ctx, body);

  createOkResponse(ctx, { quack });
};

export const readQuack: AppRouterMiddleware = async (ctx) => {
  const id = getParamIntFromPath(ctx);

  const quack = await quackService.readQuack(ctx, id);

  createOkResponse(ctx, { quack });
};

export const updateQuack: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);

  const id = getParamIntFromPath(ctx);
  const body = await getReqBody<Partial<Quack>>(ctx);

  const record = await quackService.readQuack(ctx, id);

  if (record?.createdBy !== did) {
    throw new httpErrors.Forbidden("Not authorized to edit Quack");
  }

  record.text = body.text || record.text;

  const quack = await quackService.updateQuack(ctx, id, body);

  createOkResponse(ctx, { quack });
};

export const deleteQuack: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);

  const id = getParamIntFromPath(ctx);

  const record = await quackService.readQuack(ctx, id);

  if (!record) {
    throw new httpErrors.NotFound("Quack not found");
  }

  if (record.createdBy !== did) {
    throw new httpErrors.Unauthorized("Not authorized to delete Quack");
  }

  await quackService.deleteQuack(ctx, id);

  createOkResponse(ctx);
};
