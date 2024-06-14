import Navbar from "../NavBar/Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router";
import HeaderBottom from "../HeaderBottom";
import PopUp from "../PopUp";

/* eslint-disable react/prop-types */
function MainLayout({
  categoriesServer,
  searchQuery,
  setSearchQuery,
  showCheckEmailPopUp,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar />
      <HeaderBottom
        categoriesServer={categoriesServer}
        searchQuery={searchQuery}
        onQueryChange={setSearchQuery}
      />
      <PopUp heading={"Disclaimer"}>
        This project was made only for educational purposes.
      </PopUp>

      {showCheckEmailPopUp && (
        <PopUp heading={"Important"}>
          Check your email to activate your account
        </PopUp>
      )}

      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
