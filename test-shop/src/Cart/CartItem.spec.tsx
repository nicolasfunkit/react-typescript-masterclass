import { CartItem } from "./CartItem";
import { Product } from "../shared/types";
import { renderWithRouter } from "../testHelpers";
import { fireEvent } from "@testing-library/react";

const product: Product = {
  name: "Product Foo",
  price: 100,
  image: "/image/source.png",
};

describe("CartItem", () => {
  it("renders correctly", () => {
    const { container, getByAltText } = renderWithRouter(
      <CartItem product={product} removeFromCart={() => {}} />
    );

    expect(container.innerHTML).toMatch("Product Foo");
    expect(container.innerHTML).toMatch("100 Zm");
    expect(getByAltText("Product Foo")).toHaveAttribute(
      "src",
      "/image/source.png"
    );
  });

  describe("on 'Remove' click", () => {
    it("calls passed in function", () => {
      const removeFromCartMock = vi.fn();

      const { getByText } = renderWithRouter(
        <CartItem product={product} removeFromCart={removeFromCartMock} />
      );

      fireEvent.click(getByText("Remove"));

      expect(removeFromCartMock).toBeCalledWith(product);
    });
  });
});
