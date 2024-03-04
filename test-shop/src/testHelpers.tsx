import { RenderResult, render } from "@testing-library/react";
import { ReactNode } from "react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

type Route = {
  route: string;
};

type RenderWithRouter = (
  ui: ReactNode,
  route?: Route
) => RenderResult & { user: UserEvent };

declare global {
  namespace NodeJS {
    interface Global {
      renderWithRouter: RenderWithRouter;
    }
  }
}

export const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
