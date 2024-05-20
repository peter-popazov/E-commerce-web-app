/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import DarkMode from "./DarkMode";
import DropDownMenu from "./DropDownMenu";
import { links } from "../shared/links";
import Logo from "../shared/Logo";
import Button from "../shared/Button";

function Navbar({ isAuthenticated }) {
  const [cartItems] = useState(3);

  return (
    <header
      className="bg-white dark:bg-gray-900 dark:text-white
    duration-200 relative z-40 mb-8"
    >
      <div className="py-4 mx-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo />
            <nav className="hidden md:block">
              <ul className="flex items-center gap-4">
                {links.map((data, i) => (
                  <NavLink key={i} info={data} />
                ))}
                <DropDownMenu />
              </ul>
            </nav>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="flex group justify-between items-center gap-4">
              <input type="text" placeholder="Search" className="search-bar" />
              <IoMdSearch
                className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400
              right-3 duration-200"
              />
            </div>
            {isAuthenticated ? (
              <button className="relative p-3">
                <FaShoppingCart className="text-xl text-gray-600 dark:text-gray-400" />

                {cartItems != 0 && (
                  <span
                    className="w-4 h-4 bg-red-500 text-white font-medium rounded-full
                absolute top-0 right-0 flex items-center justify-center text-xs"
                  >
                    {cartItems}
                  </span>
                )}
              </button>
            ) : (
              <Link to={"/register"}>
                <Button textColor="text-white" bgColor="bg-primary">
                  Register
                </Button>
              </Link>
            )}
            <DarkMode />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ info }) {
  return (
    <li>
      <a href={info.link} className="link">
        {info.name}
      </a>
    </li>
  );
}

export default Navbar;
