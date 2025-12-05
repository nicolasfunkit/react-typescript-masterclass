import { Router } from "oak";
import { AppState } from "../main.ts";
import { createOkResponse } from "./utils.ts";
import {
  createDuck,
  deleteDuck,
  login,
  readDuck,
  updateDuck,
} from "./duck/controller.ts";
import {
  createQuack,
  deleteQuack,
  listQuacks,
  readQuack,
  updateQuack,
} from "./quack/controller.ts";
import { toggleCrumb } from "./crumb/controller.ts";

const duckRouter = new Router<AppState>()
  .post("/", createDuck)
  .get("/:id", readDuck)
  .put("/:id", updateDuck)
  .delete("/:id", deleteDuck);

const quackRouter = new Router<AppState>()
  .get("/", listQuacks)
  .post("/", createQuack)
  .get("/:id", readQuack)
  .put("/:id", updateQuack)
  .delete("/:id", deleteQuack)
  .put("/:id/crumb", toggleCrumb);

const v1Router = new Router<AppState>()
  .use("/duck", duckRouter.routes(), duckRouter.allowedMethods())
  .use("/quack", quackRouter.routes(), quackRouter.allowedMethods())
  .post("/login", login)
  .get("/health-check", (ctx) => {
    createOkResponse(ctx);
  });

export const router = new Router<AppState>()
  .use("/v1", v1Router.routes(), v1Router.allowedMethods());
