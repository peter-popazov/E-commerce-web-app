/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favItems, setFavItems] = useState([]);

  const addToFavs = (productId) => {
    setFavItems((prevState) => {
      if (!prevState.includes(productId)) {
        return [...prevState, productId];
      }
      return prevState;
    });
  };

  const removeFavs = (productId) => {
    setFavItems((prevState) => prevState.filter((id) => id !== productId));
  };

  const toggleFavs = (productId) => {
    if (favItems.includes(productId)) {
      removeFavs(productId);
    } else {
      addToFavs(productId);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favItems,
        addToFavs,
        removeFavs,
        toggleFavs,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
