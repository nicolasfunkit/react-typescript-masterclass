import { AppRouterMiddleware } from "../../main.ts";
import {
  createOkResponse,
  getJwtPayload,
  getParamIntFromPath,
  getReqBody,
} from "../utils.ts";
import * as crumbService from "./service.ts";

export const toggleCrumb: AppRouterMiddleware = async (ctx) => {
  const { did } = await getJwtPayload(ctx);

  const quackId = getParamIntFromPath(ctx);

  const body = await getReqBody(ctx);

  await crumbService.toggleCrumb(ctx, {
    quackId: quackId,
    duckId: did,
    connect: body.connect === true,
  });

  createOkResponse(ctx);
};
