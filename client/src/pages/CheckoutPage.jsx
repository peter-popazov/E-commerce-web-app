/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sendDetailsToServer } from "../utils/sendDataToServer";
import { CartContext } from "../components/providers/CartProvider";
import CartInfoCheckout from "../components/CartInfoCheckout";
import { useAuth } from "../components/providers/AuthContext";

const loginFormInputs = [
  {
    id: "firstName",
    type: "text",
    children: "Firstname",
    placeholder: "John",
  },
  {
    id: "lastName",
    type: "text",
    children: "Lastname",
    placeholder: "Doe",
  },
  {
    id: "addressLine1",
    type: "text",
    children: "Address Line 1",
    placeholder: "Street Address",
  },
  {
    id: "addressLine2",
    type: "text",
    children: "Address Line 2",
    placeholder: "Building address",
  },
  {
    id: "city",
    type: "text",
    children: "City",
    placeholder: "Required",
  },
  {
    id: "country",
    type: "text",
    children: "Country",
    placeholder: "Required",
  },
];

function CheckoutPage({ productsServer }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigateTo = useNavigate();
  const methods = useForm();
  const { token } = useAuth();

  const [errors, setErrors] = useState("");

  const [deliveryData, setDeliveryData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
  });

  const onSubmit = methods.handleSubmit(() => {
    handleSubmitClick();
  });

  // send delivery data, after success -> send cart items
  let addressId;
  const handleSubmitClick = async () => {
    const payload = {
      firstName: deliveryData.firstName,
      lastName: deliveryData.lastName,
      addressLine1: deliveryData.addressLine1,
      addressLine2: deliveryData.addressLine2,
      city: deliveryData.city,
      country: deliveryData.country,
    };

    try {
      addressId = await sendDetailsToServer(
        payload,
        () => {},
        setErrors,
        "/delivery",
        token
      );
    } catch (error) {
      console.error("Error during server communication:", error);
    }

    successfullCheckOut();
  };

  // send cart items
  const successfullCheckOut = async () => {
    const payload = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      await sendDetailsToServer(
        payload,
        () => {
          navigateTo("/payment");
          clearCart();
        },
        setErrors,
        `/order/${addressId}`,
        token
      );
    } catch (error) {
      console.error("Error during server communication:", error);
    }
  };

  return (
    <div className="max-w-7xl sm:px-10 px-4 mx-auto grid md:grid-cols-6 gap-8">
      <div className="col-span-3 mx-2 sm:mx-10">
        <h1 className="text-4xl font-bold">Checkout</h1>
        <h2 className="text-xl font-semibold mt-4">Delivery information</h2>
        {errors && (
          <p className="mt-3 text-red-600 px-2 py-1 bg-red-100 rounded-md">
            Error: {errors}
          </p>
        )}
        <FormProvider {...methods}>
          <form method="POST" className="mt-4" onSubmit={onSubmit}>
            {loginFormInputs.map((loginInputs) => (
              <Input
                key={loginInputs.id}
                id={loginInputs.id}
                type={loginInputs.type}
                placeholder={loginInputs.placeholder}
                data={deliveryData}
                onDataChange={setDeliveryData}
              >
                {loginInputs.children}
              </Input>
            ))}

            <Button
              bgColor="bg-primary"
              textColor="text-white"
              buttonType="submit"
              rounded={"rounded-xl"}
              onButtonClick={(e) => {
                e.preventDefault;
                onSubmit(e);
              }}
            >
              Proceed to payment
            </Button>
          </form>
        </FormProvider>
      </div>
      <aside className="w-full col-span-3">
        <CartInfoCheckout productsServer={productsServer} />
      </aside>
    </div>
  );
}

export default CheckoutPage;
