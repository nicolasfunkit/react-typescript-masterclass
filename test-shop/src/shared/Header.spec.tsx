import { useLocation } from "react-router-dom";
import { renderWithRouter } from "../testHelpers";
import { Header } from "./Header";
import { fireEvent } from "@testing-library/react";

vi.mock("./CartWidget", () => ({
  CartWidget: () => <div>Cart widget</div>,
}));

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = renderWithRouter(<Header />);
    expect(container.innerHTML).toMatch("Goblin Store");
    expect(container.innerHTML).toMatch("Cart widget");
  });

  it("navigates to / on header title click", () => {
    const { getByText } = renderWithRouter(<Header />);
    fireEvent.click(getByText("Goblin Store"));

    expect(window.location.pathname).toEqual("/");
  });
});
