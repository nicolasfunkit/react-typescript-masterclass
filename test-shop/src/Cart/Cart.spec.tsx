import { Cart } from "./Cart";
import { useCartContext } from "../CartContext";
import { renderWithRouter } from "../testHelpers";
import { fireEvent } from "@testing-library/react";
import { CartItemProps } from "./CartItem";

vi.mock("../CartContext", () => ({
  useCartContext: vi.fn(),
}));

const useCartContextMock = useCartContext as unknown as vi.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;

vi.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product;
    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

describe("Cart", () => {
  describe("without products", () => {
    beforeEach(() => {
      useCartContextMock.mockReturnValue({
        products: [],
      });
    });

    it("renders empty cart message", () => {
      const { container } = renderWithRouter(<Cart />);
      expect(container.innerHTML).toMatch("Your cart is empty.");
    });

    describe("on 'Back to main page' click", () => {
      it("redirects to '/'", () => {
        const { getByText } = renderWithRouter(<Cart />);

        fireEvent.click(getByText("Back to main page."));

        expect(window.location.pathname).toBe("/");
      });
    });
  });

  describe("with products", () => {
    beforeEach(() => {
      const products = [
        {
          name: "Product foo",
          price: 100,
          image: "/image/foo_source.png",
        },
        {
          name: "Product bar",
          price: 100,
          image: "/image/bar_source.png",
        },
      ];

      useCartContextMock.mockReturnValue({
        products,
        totalPrice: () => 55,
      });
    });

    it("renders cart products list with total price", () => {
      const { container } = renderWithRouter(<Cart />);

      expect(container.innerHTML).toMatch(
        "Product foo 100 /image/foo_source.png"
      );
      expect(container.innerHTML).toMatch(
        "Product bar 100 /image/bar_source.png"
      );
      expect(container.innerHTML).toMatch("Total: 55 Zm");
    });

    describe("on 'go to checkout' click", () => {
      it("redirects to '/checkout'", () => {
        const { getByText } = renderWithRouter(<Cart />);

        fireEvent.click(getByText("Go to checkout"));

        expect(window.location.pathname).toBe("/checkout");
      });
    });
  });
});
