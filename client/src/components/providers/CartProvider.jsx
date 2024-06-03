/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId) => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (productId) => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct && existingProduct.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemDetils = (productsServer, cartItems) => {
    const cartItemDetails = cartItems.map((cartItem) => {
      const product = productsServer.find(
        (product) => product.id === cartItem.id
      );
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    });

    return cartItemDetails;
  };

  const calcDeliveryCost = (totalAmount) => {
    let shippingCharge = 0; 
    if (totalAmount <= 200) {
      shippingCharge = 30;
    } else if (totalAmount <= 400) {
      shippingCharge = 25;
    } else if (totalAmount > 400) {
      shippingCharge = 20;
    }
    return shippingCharge;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getItemDetils,
        calcDeliveryCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
