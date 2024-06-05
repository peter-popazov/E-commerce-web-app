/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "./providers/CartProvider";
import { ImCross } from "react-icons/im";

function ItemCart({ item, setProductsServer, productsServer }) {
  const { addToCart, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2 text-gray-800">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <ImCross
          className="hover:text-red-500 duration-300 cursor-pointer"
          onClick={() => removeFromCart(item.id)}
        />
        <img className="w-28 h-32" src={item.filePath} alt="" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() =>
              decreaseQuantity(item.id, productsServer, setProductsServer)
            }
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() =>
              addToCart(item.id, productsServer, setProductsServer)
            }
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-semibold text-lg">
          <p>${item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCart;
