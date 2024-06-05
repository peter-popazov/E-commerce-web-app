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
import SearchProvider from "./components/providers/SearchProvider.jsx";
import { CartProvider } from "./components/providers/CartProvider.jsx";
import noAuthDataFromServer from "./utils/noAuthDataFromServer.js";

export function App() {
  const [productsServer, setProductsServer] = useState([]);
  const [categoriesServer, setCategoriesServer] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await noAuthDataFromServer("/products");
      setProductsServer(data);
    };
    fetchData();
  }, []);

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
          element: <RegisterForm />,
        },
        {
          path: "/products",
          element: React.createElement(ProductsPage, {
            productsServer,
            categoriesServer,
            setProductsServer,
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
          }),
        },
        {
          path: "/payment",
          element: React.createElement(PaymentPage, {}),
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
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
