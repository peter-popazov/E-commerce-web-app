/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/providers/CartProvider";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

function CartInfoCheckout({ productsServer }) {
  const [productsTotal, setProductsTotal] = useState(0);
  const [shipping, setShippig] = useState(0);
  const { cartItems, getItemDetils, calcDeliveryCost } =
    useContext(CartContext);
  const cartItemDetails = getItemDetils(productsServer, cartItems);

  useEffect(() => {
    let price = 0;
    cartItemDetails.forEach((item) => {
      price += item.price * item.quantity;
    });
    setProductsTotal(price);
  }, [cartItemDetails]);

  useEffect(() => {
    setShippig(calcDeliveryCost(productsTotal));
  }, [productsTotal, calcDeliveryCost]);

  return (
    <div className="w-full text-gray-800">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Cart items</h2>
      </div>
      {cartItemDetails.map((item) => (
        <div key={item.id}>
          <ItemCart item={item} />
        </div>
      ))}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-semibold">Total with shipping</h3>
        <p className="text-2xl font-semibold">${productsTotal + shipping}</p>
      </div>
      <div className="text-md">
        <p>
          Cart items are wrong?
          <Link className="link ml-2" to={"/cart"}>
            Go to cart
          </Link>
        </p>
      </div>
    </div>
  );
}

function ItemCart({ item }) {
  const { removeFromCart } = useContext(CartContext);
  return (
    <div className="flex mb-4 border gap-2 py-2">
      <div className="flex w-2/3 items-center gap-4 ml-4">
        <ImCross
          className="text-gray-800 hover:text-red-500 duration-300 cursor-pointer"
          onClick={() => removeFromCart(item.id)}
        />
        <img className="w-28 h-32" src={item.filePath} alt="" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>

      <div className="flex w-1/3 items-center justify-around py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0">
        <p>{item.quantity} pcs.</p>
        <p>${item.quantity * item.price}</p>
      </div>
    </div>
  );
}

export default CartInfoCheckout;
