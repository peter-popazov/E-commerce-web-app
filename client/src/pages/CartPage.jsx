/* eslint-disable react/prop-types */
import { useContext } from "react";
import Cart from "../components/Cart";
import Warn from "../components/Warn";
import { CartContext } from "../components/providers/CartProvider";

function CartPage({ productsServer, setProductsServer }) {
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
          productsServer={productsServer}
          setProductsServer={setProductsServer}
        />
      ) : (
        <Warn>You do not have any items in your cart yet!</Warn>
      )}
    </div>
  );
}

export default CartPage;
