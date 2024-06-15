/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import Button from "./shared/Button";
import { FavoriteContext } from "../components/providers/FavouriteProvider";
import { CartContext } from "../components/providers/CartProvider";

function CardWishlist({
  id,
  img,
  title,
  price,
  inventoryQuantity,
  longDescription,
  productsServer,
  setProductsServer,
}) {
  const { removeFavs } = useContext(FavoriteContext);
  const { addToCart } = useContext(CartContext);
  const isActive = inventoryQuantity > 0;

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`relative flex flex-row justify-between w-full h-[225px] lg:h-[250px] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg 
          dark:bg-gray-800 dark:border-gray-700 duration-300 ${
            !isActive ? "opacity-50 pointer-events-none" : ""
          } ${width < 380 ? "h-[420px] flex-col" : ""}
          `}
    >
      <FaTrashCan
        className="absolute right-0 top-24 mr-5 text-xl text-gray-800 hover:text-primary duration-200"
        onClick={() => removeFavs(id)}
      />
      <Link to={""} className="flex justify-center items-center bg-gray-100">
        <img
          src={img}
          alt={title}
          className={`h-48 lg:h-48 xl:h-56 object-cover p-2 lg:p-2 ${
            !isActive ? "grayscale" : ""
          }`}
        />
      </Link>
      <div className={`flex flex-col flex-grow gap-2 p-5 w-2/3 ${width < 380 ? "w-full" : ""}`}>
        <Link to={""}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="text-md">{longDescription}</p>
        <div className="mt-auto">
          <div className="mb-2 flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <AiFillStar key={index} className="text-yellow-400" />
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              Q:{inventoryQuantity}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              ${price}
            </span>
            <Button
              textColor={"text-white dark:text-gray-600"}
              bgColor={"bg-brandBlue hover:bg-blue-700"}
              rounded={"rounded-2xl"}
              onButtonClick={() =>
                addToCart(id, productsServer, setProductsServer)
              }
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWishlist;
