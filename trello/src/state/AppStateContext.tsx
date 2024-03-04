import React, { createContext, useContext, Dispatch, useEffect } from "react";
import { AppState, List, Task, appStateReducer } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

type AppStateContextProps = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
  draggedItem: DragItem | null
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

type AppStateProviderProps = {
  children: React.ReactNode
  initialState: AppState
}

export const AppStateProvider =
  withInitialState<AppStateProviderProps>(
    ({ children, initialState }) => {
      const [state, dispatch] = useImmerReducer(
        appStateReducer,
        initialState
      )

      useEffect(() => {
        save(state)
      }, [state])

      const { draggedItem, lists } = state
      const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
      }

      return (
        <AppStateContext.Provider
          value={{ draggedItem, lists, getTasksByListId, dispatch }}
        >
          {children}
        </AppStateContext.Provider>
      )
    }
  )

export const useAppState = () => {
  return useContext(AppStateContext);
};
