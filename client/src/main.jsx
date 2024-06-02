import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MainLayout from "./components/shared/MainLayout.jsx";
import AuthProvider from "./components/providers/AuthContext.jsx";
import SearchProvider from "./components/providers/SearchProvider.jsx";
import CartPage from "./pages/CartPage.jsx";
import { CartProvider } from "./components/providers/CartProvider.jsx";
// import { getDataFromServer } from "./utils/getDataFromServer.js";

const categoriesServer = [
  {
    id: 1,
    name: "accessories",
  },
  {
    id: 2,
    name: "mobile phones",
  },
  {
    id: 3,
    name: "computer techs",
  },
];

export function App() {
  const [productsServer, setProductsServer] = useState([]);

  useEffect(() => {
    //   const fetchData = async () => {
    //     const data = await getDataFromServer("/products");
    //     setProductsServer(data);
    //   };
    setProductsServer([
      {
        id: 1,
        name: "iPhone 15 256Gb",
        filePath:
          "https://i.citrus.world/imgcache/size_800/uploads/shop/1/6/1699447786-728975-1.webp",
        shortDescription: "Apple iPhone 15 256Gb 5G",
        longDescription: "Apple iPhone 15 256Gb 5G",
        price: 789,
        inventory: null,
        category: {
          id: 2,
          name: "mobile phones",
        },
      },
      {
        id: 2,
        name: "Dell Monitor - P2424HT",
        filePath:
          "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/peripherals/output-devices/composite-franchise-imagery/monitor/monitor-ultrasharp-family-franchise-page-1.jpg?fmt=jpg&wid=552&hei=460",
        shortDescription: "Dell 24 Monitor",
        longDescription: "Dell 24 Touch USB-C Hub Monitor - P2424HT",
        price: 189,
        inventory: null,
        category: {
          id: 3,
          name: "computer techs",
        },
      },
      {
        id: 3,
        name: "Microsoft Surface Pro 4 Type Cover",
        filePath:
          "https://i5.walmartimages.com/asr/2a41f6f0-844e-4ace-b7e3-63faef991173_1.2179afeb48142c34d2c84adf91b42b02.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
        shortDescription:
          "Microsoft Surface Pro 4 Type Cover with Fingerprint ID",
        longDescription:
          "This keyboard is very easy to type on, but the fingerprint reader is the best feature. It is very accurate and simplifies login.",
        price: 99,
        inventory: null,
        category: {
          id: 1,
          name: "accessories",
        },
      },
    ]);
    //   fetchData();
  }, []);

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
          }),
        },
        {
          path: "/cart",
          element: React.createElement(CartPage, {
            productsServer,
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
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
