import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsSuitHeartFill } from "react-icons/bs";
import { useState, useContext } from "react";
import { SearchContext } from "./SearchProvider";

function HeaderBottom() {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 relative mb-10">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-100 bg-primeColor w-auto text-gray-800 dark:hover:text-primary/90 h-auto p-4 pb-6 bg-white z-[9999]"
              >
                <Link to={"category/category1"}>
                  <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                    Category1
                  </li>
                </Link>
                <Link to={"category/category2"}>
                  <li className="px-4 py-1 border-b-[1px] bg-white border-b-gray-400 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                    Category2
                  </li>
                </Link>
                <Link to={"category/category3"}>
                  <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                    Category3
                  </li>
                </Link>
                <Link to={"category/category4"}>
                  <li className="px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                    Category4
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>
          <div className="relative z-[9999] w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <Link to="/products">
              <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] dark:text-gray-700 placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search for your products here"
              />
            </Link>
            <FaSearch className="w-5 h-5" />
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-gray-800 h-auto p-4 pb-6"
              >
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
                <Link to="/">
                  <li className="text-gray-800 dark:text-white dark:bord-white px-4 py-1 border-b-[1px] border-b-gray-800 hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                    Change Password
                  </li>
                </Link>
                <li className="text-gray-800 dark:text-white dark:bord-white px-4 py-1 border-b-[1px] border-b-gray-800  hover:border-b-primary/90 hover:text-primary/90 duration-300 cursor-pointer">
                  Others
                </li>
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white"></span>
              </div>
            </Link>
            <BsSuitHeartFill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBottom;
