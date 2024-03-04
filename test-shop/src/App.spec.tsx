import { render } from "@testing-library/react";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container.innerHTML).toMatch("Goblin Store");
  });
});
