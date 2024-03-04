import { render } from "@testing-library/react";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { renderWithRouter } from "./testHelpers";

vi.mock("./Home", () => ({ Home: () => <div>Home</div> }));
vi.mock("./OrderSummary", () => ({
  OrderSummary: () => <div>Order summary</div>,
}));
vi.mock("./Checkout", () => ({
  Checkout: () => <div>Checkout</div>,
}));

describe("App", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container.innerHTML).toMatch("Goblin Store");
  });

  it("renders Home component on root route", () => {
    const { container } = renderWithRouter(<App />, { route: "/" });
    expect(container.innerHTML).toMatch("Home");
  });
});

describe("routing", () => {
  it("renders home page on '/'", () => {
    const { container } = renderWithRouter(<App />, { route: "/" });
    expect(container.innerHTML).toMatch("Home");
  });
  it("renders checkout page on '/checkout'", () => {
    const { container } = renderWithRouter(<App />, { route: "/checkout" });
    expect(container.innerHTML).toMatch("Checkout");
  });
  it("renders 'page not found' message on nonexistent route", () => {
    const { container } = renderWithRouter(<App />, {
      route: "/this-route-does-not-exist",
    });
    console.log(container.innerHTML)
    expect(container.innerHTML).toMatch("Page not found");
  });
});
