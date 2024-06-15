/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FavoriteContext } from "../components/providers/FavouriteProvider";
import Warn from "../components/Warn";
import CardWishlist from "../components/CardWishlist";

function WishlistPage({ productsServer, setProductsServer }) {
  const { favItems } = useContext(FavoriteContext);

  const favoriteProducts = productsServer.filter((product) =>
    favItems.includes(product.id)
  );

  const result = favoriteProducts.map(
    ({ id, filePath, name, price, longDescription, inventory }) => (
      <CardWishlist
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
    <main className="mx-auto container">
      {result.length > 0 ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">Your Wishlist</h1>
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

export default WishlistPage;
