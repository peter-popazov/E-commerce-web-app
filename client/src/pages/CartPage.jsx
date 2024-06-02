/* eslint-disable react/prop-types */
import { useContext } from "react";
import Cart from "../components/Cart";
import EmptyCart from "../components/EmptyCart";
import { CartContext } from "../components/providers/CartProvider";

function CartPage({ productsServer }) {
  const { cartItems } = useContext(CartContext);

  const cartItemDetails = cartItems.map((cartItem) => {
    const product = productsServer.find(
      (product) => product.id === cartItem.id
    );
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  return (
    <div className="max-w-container mx-auto px-4">
      {cartItemDetails.length > 0 ? (
        <Cart cartDetails={cartItemDetails} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default CartPage;
