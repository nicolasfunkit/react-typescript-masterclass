import { Duck } from "../duck/model.ts";
import { Quack } from "../quack/model.ts";

export interface Crumb {
  duckId: Duck["id"];
  quackId: Quack["id"];
}

export const CrumbKeys = {
  TableName: "crumb",
  ColDuckId: "duckId",
  ColQuackId: "quackId",
} as const;
