import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import DarkMode from "./NavBar/DarkMode";

const navLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Buy",
    link: "/#",
  },
  {
    id: 3,
    name: "Sale",
    link: "/#",
  },
  {
    id: 4,
    name: "Blog",
    link: "/#",
  },
  {
    id: 5,
    name: "About",
    link: "/#",
  },
];

NavLink.propTypes = navLinks;

function Navbar() {
  const [cartItems] = useState(3);

  return (
    <div
      className="bg-white dark:bg-gray-900 dark:text-white
    duration-200 relative z-40"
    >
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widerst 
              text-2xl uppercase sm:text-3xl mr-4"
            >
              ESHOP
            </a>
            <div className="hidden md:block">
              <ul className="flex items-center gap-4">
                {navLinks.map((data, i) => (
                  <NavLink key={i} info={data} />
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="flex group justify-between items-center gap-4">
              <input type="text" placeholder="Search" className="search-bar" />
              <IoMdSearch
                className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400
              right-3 duration-200"
              />
            </div>

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
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ info }) {
  return (
    <li>
      <a
        href={info.link}
        className="inline-block px-4 font-semibold
        text-gray-700 hover:text-black dark:hover:text-white duration-200"
      >
        {info.name}
      </a>
    </li>
  );
}

export default Navbar;
