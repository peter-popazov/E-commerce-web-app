/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FavoriteContext } from "../components/providers/FavouriteProvider";
import { CartContext } from "../components/providers/CartProvider";
import Warn from "../components/Warn";

function FavouritePage({ productsServer, setProductsServer }) {
  const { favItems } = useContext(FavoriteContext);

  const favoriteProducts = productsServer.filter((product) =>
    favItems.includes(product.id)
  );

  const result = favoriteProducts.map(
    ({ id, filePath, name, price, longDescription, inventory }) => (
      <CardFav
        key={id}
        id={id}
        img={filePath}
        title={name}
        price={price}
        inventoryQuantity={inventory.quantity}
        longDescription={longDescription}
        productsServer={productsServer}
        setProductsServer={setProductsServer}
      />
    )
  );

  return (
    <main className="md:m-4 container">
      {result.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-8">Favourites</h1>
          <section className="grid lg:grid-cols-2 gap-8 dark:bg-gray-900">
            {result}
          </section>
        </>
      ) : (
        <Warn>You do not have any items in your wishlist!</Warn>
      )}
    </main>
  );
}

function CardFav({
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

  return (
    <div
      className={`relative flex flex-row justify-between w-full h-[200px] lg:h-[250px] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg 
        dark:bg-gray-800 dark:border-gray-700 duration-300 ${
          !isActive ? "opacity-50 pointer-events-none" : ""
        }`}
    >
      <FaTrashCan
        className="absolute right-0 top-24 mr-5 text-xl text-gray-800 hover:text-primary duration-200"
        onClick={() => removeFavs(id)}
      />
      <Link to={""} className="flex justify-center items-center bg-gray-100">
        <img
          src={img}
          alt={title}
          className={`h-48 lg:h-48 xl:h-56 object-cover p-6 lg:p-2 ${
            !isActive ? "grayscale" : ""
          }`}
        />
      </Link>
      <div className="flex flex-col flex-grow gap-2 p-5 w-2/3">
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
            <span className="text-3xl font-bold text-gray-800 dark:text-white">
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
    </div>
  );
}

export default FavouritePage;
