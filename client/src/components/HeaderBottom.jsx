/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";

import { CartContext } from "../components/providers/CartProvider";
import { AuthContext } from "./providers/AuthContext";
import { FavoriteContext } from "./providers/FavouriteProvider";

function HeaderBottom({ categoriesServer, searchQuery, onQueryChange }) {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { favItems } = useContext(FavoriteContext);

  const handleSearch = (e) => {
    onQueryChange(e.target.value);
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 relative mb-12">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            className="flex h-14 cursor-pointer items-center gap-2 text-gray-800 dark:text-gray-200"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-100 bg-primeColor w-auto text-gray-80 h-auto p-4 pb-6 bg-white z-[10] dark:bg-gray-900 dark:text-gray-300"
              >
                <ul>
                  {categoriesServer.map((category) => (
                    <CategoryLink category={category} key={category.id} />
                  ))}
                </ul>
              </motion.ul>
            )}
          </div>
          <div className="relative z-[10] w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white dark:bg-gray-600 flex items-center gap-2 justify-between px-6 rounded-xl">
            <Link to="/products">
              <input
                id="query"
                className="flex-1 lg:w-[450px] md:w-[600px] w-[200px] h-full outline-none placeholder:text-[#C4C4C4] dark:text-gray-200 dark:bg-gray-600 placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search for your products here"
              />
            </Link>
            <FaSearch className="w-5 h-5 dark:text-gray-200" />
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0 items-center pr-6 cursor-pointer relative dark:text-gray-200 text-gray-800">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            <Link to="/wishlist">
              <BsSuitHeartFill
                className={`mr-1.5 ${
                  favItems.length > 0 ? "text-primary" : ""
                }`}
              />
            </Link>
            <CartIcon cartItems={cartItems} />
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-2 sm:top-10 left-0 z-50 w-44 text-gray-800 h-auto p-4 pb-6"
              >
                {!isLoggedIn ? (
                  <>
                    <Link to="/login">
                      <li className="text-gray-800 dark:text-white dark:bord-white px-4 py-1 border-b-[1px] border-b-gray-800 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                        Login
                      </li>
                    </Link>
                    <Link onClick={() => setShowUser(false)} to="/register">
                      <li className="text-gray-800 dark:text-white dark:bord-white px-4 py-1 border-b-[1px] border-b-gray-800 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                        Sign Up
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/">
                      <li className="text-gray-800 dark:text-white dark:bord-white px-4 py-1 border-b-[1px] border-b-gray-800 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                        Change Password
                      </li>
                    </Link>
                    <Link to="/">
                      <li
                        onClick={logout}
                        className="text-gray-800 dark:text-white dark:bord-white px-4 py-1 border-b-[1px] border-b-gray-800  hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer"
                      >
                        Log Out
                      </li>
                    </Link>
                  </>
                )}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryLink({ category }) {
  return (
    <Link to={`category/${category.name}`}>
      <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
        {category.name}
      </li>
    </Link>
  );
}

function CartIcon({ cartItems }) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="relative">
      <Link to="/cart">
        <FaShoppingCart />
        {totalQuantity > 0 && (
          <span
            className="w-4 h-4 bg-red-500 text-white font-medium rounded-full
          absolute top-0 left-5 flex items-center justify-center text-xs"
          >
            {totalQuantity}
          </span>
        )}
      </Link>
    </div>
  );
}

export default HeaderBottom;
