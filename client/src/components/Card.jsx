/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./providers/CartProvider";

function Card({
  id,
  img,
  title,
  price,
  inventoryQuantity,
  productsServer,
  setProductsServer,
}) {
  const { addToCart } = useContext(CartContext);
  const isActive = inventoryQuantity > 0;

  return (
    <div
      className={`flex flex-col justify-between w-72 h-96 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 
      transition-shadow duration-300 ${
        !isActive ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <Link
        to={""}
        className="flex justify-center items-center h-52 bg-gray-100"
      >
        <img
          src={img}
          alt={title}
          className={`h-full w-full object-cover ${
            !isActive ? "grayscale" : ""
          }`}
        />
      </Link>
      <div className="flex flex-col flex-grow p-5">
        <Link to={""}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <AiFillStar key={index} className="text-yellow-400" />
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              Q:{inventoryQuantity}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => addToCart(id, productsServer, setProductsServer)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Card;
