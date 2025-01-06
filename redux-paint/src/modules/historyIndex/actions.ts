import { Stroke } from "../../utils/types";
import { Action as AnyAction } from "@reduxjs/toolkit";

export const UNDO = "UNDO";
export const REDO = "REDO";
export const END_STROKE = "END_STROKE";

export type HistoryIndexAction =
  | AnyAction
  | {
      type: typeof UNDO;
      payload: number;
    }
  | {
      type: typeof REDO;
    }
  | {
      type: typeof END_STROKE;
      payload: { stroke: Stroke; historyIndex: number };
    };

export const undo = (undoLimit: number) => {
  return { type: UNDO, payload: undoLimit };
};

export const redo = () => {
  return { type: REDO };
};
