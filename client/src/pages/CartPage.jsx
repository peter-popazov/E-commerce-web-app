/* eslint-disable react/prop-types */
import { useContext } from "react";
import Cart from "../components/Cart";
import EmptyCart from "../components/EmptyCart";
import { CartContext } from "../components/providers/CartProvider";

function CartPage({ productsServer }) {
  const { cartItems, clearCart, getItemDetils, calcDeliveryCost } =
    useContext(CartContext);

  const cartItemDetails = getItemDetils(productsServer, cartItems);

  return (
    <div className="max-w-container mx-auto px-4">
      {cartItemDetails.length > 0 ? (
        <Cart
          cartItemDetails={cartItemDetails}
          clearCart={clearCart}
          calcDeliveryCost={calcDeliveryCost}
        />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default CartPage;
