import { CartWidget } from "./CartWidget";
import { fireEvent } from "@testing-library/react";
import { useCartContext } from "../../CartContext";
import { renderWithRouter } from "../../testHelpers";

vi.mock("../../CartContext", () => ({
  useCartContext: vi.fn(),
}));

const useCartContextMock = useCartContext as unknown as vi.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;

describe("CartWidget", () => {
  it("navigates to cart summary page on click", () => {
    useCartContextMock.mockReturnValue({
      products: [],
    });
    const { getByRole } = renderWithRouter(<CartWidget />);

    fireEvent.click(getByRole("link"));

    expect(window.location.pathname).toEqual("/cart");
  });

  it("navigates to cart summary page on click", () => {
    useCartContextMock.mockReturnValue({
      products: [],
    });
    const { getByRole } = renderWithRouter(<CartWidget />);

    fireEvent.click(getByRole("link"));

    expect(window.location.pathname).toEqual("/cart");
  });

  it("shows the amount of products in the cart", () => {
    useCartContextMock.mockReturnValue({
      products: [
        {
          name: "Product foo",
          price: 0,
          image: "image.png",
        },
      ],
    });

    const { container } = renderWithRouter(<CartWidget />);

    expect(container.innerHTML).toMatch("1");
  });
});
