import { Duck } from "../duck/model.ts";

export interface Quack {
  id: number;
  text: string;
  createdBy: Duck["id"];
  createdAt: string;
}

export const QuackKeys = {
  TableName: "quack",
  ColId: "id",
  ColText: "text",
  ColCreatedBy: "createdBy",
  ColCreatedAt: "createdAt",
} as const;
