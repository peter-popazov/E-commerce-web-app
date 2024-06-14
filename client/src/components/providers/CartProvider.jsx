/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import noAuthDataFromServer from "../../utils/noAuthDataFromServer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId, productsServer, setProductsServer) => {
    const existingProduct = cartItems.find((item) => item.id === productId);
    const productIndex = productsServer.findIndex(
      (product) => product.id === productId
    );

    const product = productsServer[productIndex];
    if (product.inventory.quantity <= 0) {
      return;
    }

    if (productIndex !== -1) {
      const updatedProductsServer = [...productsServer];
      updatedProductsServer[productIndex] = {
        ...updatedProductsServer[productIndex],
        inventory: {
          ...updatedProductsServer[productIndex].inventory,
          quantity: updatedProductsServer[productIndex].inventory.quantity - 1,
        },
      };
      setProductsServer(updatedProductsServer);
    }
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

  const decreaseQuantity = (productId, productsServer, setProductsServer) => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    const productIndex = productsServer.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const updatedProductsServer = [...productsServer];
      updatedProductsServer[productIndex] = {
        ...updatedProductsServer[productIndex],
        inventory: {
          ...updatedProductsServer[productIndex].inventory,
          quantity: updatedProductsServer[productIndex].inventory.quantity + 1,
        },
      };
      setProductsServer(updatedProductsServer);
    }
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

  const clearCart = async (productsServer, setProductsServer) => {
    setCartItems([]);

    if (!productsServer) {
      console.error("productsServer is undefined");
      return;
    }

    try {
      const inventoryData = await noAuthDataFromServer("/inventory");

      const updatedProducts = productsServer.map((product) => {
        const inventoryItem = inventoryData.find(
          (item) => item.productId === product.id
        );
        if (inventoryItem) {
          return {
            ...product,
            inventory: {
              ...product.inventory,
              quantity: inventoryItem.quantity,
            },
          };
        } else {
          return product;
        }
      });

      // Set the updated products array to state
      setProductsServer(updatedProducts);
    } catch (error) {
      console.error("Error while fetching inventory data:", error);
    }
  };

  const getItemDetils = (productsServer) => {
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
