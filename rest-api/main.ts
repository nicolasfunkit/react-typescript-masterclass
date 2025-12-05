import {
  Application,
  Context,
  isHttpError,
  RouteParams,
  RouterContext,
  RouterMiddleware,
  State,
  Status,
  STATUS_TEXT,
} from "oak";
import { config as readEnv } from "dotenv";
import { Pool } from "postgres";
import { JWTPayload, JWTVerifyResult } from "jose";
import { router } from "./src/router.ts";
import { createErrorResponse } from "./src/utils.ts";
import { config } from "./db/db.ts";

export interface AppState extends State {
  pool: Pool;
}
export type AppContext = Context<AppState>;
export type AppRouterContext<R extends string = string> = RouterContext<
  R,
  RouteParams<R>,
  AppState
>;
export type AppRouterMiddleware<R extends string = string> = RouterMiddleware<
  R,
  RouteParams<R>,
  AppState
>;
export interface AppJwtPayload extends JWTPayload {
  did: string;
}
export interface AppJwtResult extends JWTVerifyResult {
  payload: AppJwtPayload;
}

const { APP_PORT = "8000", APP_NAME = "Application" } = await readEnv({
  safe: true,
});

const port = parseInt(APP_PORT);

const pool = new Pool(config, 10);

const app = new Application<AppState>({ state: { pool } });

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);

    let status = Status.InternalServerError;
    let message = STATUS_TEXT[status];

    if (isHttpError(e)) {
      message = e.message;
      status = e.status;
    } else if (e instanceof Error) {
      message = e.message;
    }

    createErrorResponse(ctx, message, status);
  }
});

app.use(router.routes(), router.allowedMethods());

console.info(
  `${APP_NAME} is available on port http://localhost:${port}/ with ${pool.size} pool size`,
);

await app.listen({ port });
