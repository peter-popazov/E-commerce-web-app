/* eslint-disable react/prop-types */
import ItemCart from "../components/ItemCart";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import { useState, useEffect } from "react";

function Cart({ cartItemDetails }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    let price = 0;
    cartItemDetails.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmount(price);
  }, [cartItemDetails]);

  useEffect(() => {
    if (totalAmount <= 200) {
      setShippingCharge(30);
    } else if (totalAmount <= 400) {
      setShippingCharge(25);
    } else if (totalAmount > 400) {
      setShippingCharge(20);
    }
  }, [totalAmount]);

  return (
    <div className="pb-10">
      <div className="w-full h-20 bg-[#F5F7F7] text-gray-900 sm:grid grid-cols-5 hidden place-content-center px-6 text-lg font-semibold">
        <h2 className="col-span-2">Product</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Sub Total</h2>
      </div>
      <div className="mt-5">
        {cartItemDetails.map((item) => (
          <div key={item.id}>
            <ItemCart item={item} />
          </div>
        ))}
      </div>
      <Button
        bgColor={"bg-primary"}
        textColor={"text-white"}
        rounded={"rounded-md"}
      >
        Clear Cart
      </Button>
      <div className="flex flex-col justify-between py-4 px-4 items-center gap-2 md:gap-0">
        <div className="flex items-center gap-4">
          <input
            className="w-44 md:w-52 h-10 px-3 border rounded-md text-gray-900 text-sm outline-none border-gray-400"
            type="text"
            placeholder="Coupon Number"
          />
          <Button
            bgColor={"bg-brandYellow"}
            textColor={"text-white"}
            rounded={"rounded-md"}
          >
            Apply Coupon
          </Button>
        </div>
      </div>
      <div className="max-w-7xl gap-4 flex justify-end mt-4">
        <div className="w-96 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
          <div>
            <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
              Subtotal
              <span className="font-semibold tracking-wide font-titleFont">
                ${totalAmount}
              </span>
            </p>
            <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
              Shipping ChcartItemDetailsarge
              <span className="font-semibold tracking-wide font-titleFont">
                ${shippingCharge}
              </span>
            </p>
            <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
              Total
              <span className="font-bold tracking-wide text-lg font-titleFont">
                ${totalAmount + shippingCharge}
              </span>
            </p>
          </div>
          <div className="mt-2 flex justify-end">
            <Link to="/checkout">
              <Button
                bgColor={"bg-primary"}
                textColor={"text-white"}
                rounded={"rounded-xl"}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
