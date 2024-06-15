import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import MainLayout from "./components/shared/MainLayout.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

import AuthProvider from "./components/providers/AuthContext.jsx";
import { CartProvider } from "./components/providers/CartProvider.jsx";
import { FavoriteProvider } from "./components/providers/FavouriteProvider.jsx";
import noAuthDataFromServer from "./utils/noAuthDataFromServer.js";
import WishlistPage from "./pages/WishlistPage.jsx";

export function App() {
  const [productsServer, setProductsServer] = useState([]);
  const [categoriesServer, setCategoriesServer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckEmailPopUp, setShowCheckEmailPopUp] = useState(false);

  // get data from server
  useEffect(() => {
    const fetchData = async () => {
      const data = await noAuthDataFromServer("/products");
      setProductsServer(data);
    };
    fetchData();
  }, []);

  // extract categories
  useEffect(() => {
    setCategoriesServer(
      Array.from(
        new Set(
          productsServer.map((product) => JSON.stringify(product.category))
        )
      ).map((category) => JSON.parse(category))
    );
  }, [productsServer]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: React.createElement(MainLayout, {
        categoriesServer,
        searchQuery,
        setSearchQuery,
        showCheckEmailPopUp,
      }),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: React.createElement(RegisterForm, {
            setShowCheckEmailPopUp,
          }),
        },
        {
          path: "/products",
          element: React.createElement(ProductsPage, {
            productsServer,
            setProductsServer,
            categoriesServer,
            searchQuery,
          }),
        },
        {
          path: "/cart",
          element: React.createElement(CartPage, {
            productsServer,
            setProductsServer,
          }),
        },
        {
          path: "/checkout",
          element: React.createElement(CheckoutPage, {
            productsServer,
            setProductsServer,
          }),
        },
        {
          path: "/payment",
          element: React.createElement(PaymentPage, {}),
        },
        {
          path: "/wishlist",
          element: React.createElement(WishlistPage, {
            productsServer,
            setProductsServer,
          }),
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
