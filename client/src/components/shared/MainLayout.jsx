import Navbar from "../NavBar/Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router";
import HeaderBottom from "../HeaderBottom";

/* eslint-disable react/prop-types */
function MainLayout() {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar />
      <HeaderBottom />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
