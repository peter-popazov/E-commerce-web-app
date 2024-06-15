import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useForm, FormProvider } from "react-hook-form";
import Input from "./shared/Input";
import Button from "./shared/Button";
import { AuthContext } from "./providers/AuthContext";
import { authenticateUser } from "../utils/authenticateUser";

const registerFormInputs = [
  {
    id: "userEmailRegister",
    type: "email",
    children: "Email",
    placeholder: "example@example.com",
  },
  {
    id: "username",
    type: "text",
    children: "Username",
    placeholder: "johndoe",
  },
  {
    id: "password",
    type: "password",
    children: "Password",
    placeholder: "Required",
  },
  {
    id: "confirmPassword",
    type: "password",
    children: "Confirm Password",
    placeholder: "Required",
  },
];

/* eslint-disable react/prop-types */
function RegisterForm({ setShowCheckEmailPopUp }) {
  return (
    <>
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-[8000] backdrop-blur-md">
        <div
          className="md:w-[600px] w-[350px] fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 py-10 px-8 shadow-md bg-white
        dark:bg-gray-900 dark:text-white duration-300 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="md:text-2xl text-lg font-bold">
              Register now to{" "}
              <span className="text-primary">
                {" "}
                get 20<span>&#37;</span>{" "}
              </span>
              off
            </h2>
            <div>
              <Link to={"/"}>
                <IoMdClose className="text-2xl cursor-pointer" />
              </Link>
            </div>
          </div>
          <Form setShowCheckEmailPopUp={setShowCheckEmailPopUp} />
        </div>
      </div>
    </>
  );
}

function Form({ setShowCheckEmailPopUp }) {
  const { login, setToken, setRefreshToken } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState("");

  const methods = useForm();
  const onSubmit = methods.handleSubmit(() => {
    handleSubmitClick();
  });

  const [registerData, setRegisterData] = useState({
    userEmailRegister: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmitClick = async () => {
    const payload = {
      email: registerData.userEmailRegister,
      username: registerData.username,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
    };

    const successfullRegister = () => {
      setShowCheckEmailPopUp(true);
      login();
      navigateTo("/");
    };

    await authenticateUser(
      payload,
      successfullRegister,
      setErrors,
      "/register",
      setToken,
      setRefreshToken
    );
  };

  return (
    <>
      {errors && (
        <p className="mt-3 text-red-600 px-2 py-1 bg-red-100 rounded-md">
          Error: {errors}
        </p>
      )}
      <FormProvider {...methods}>
        <form
          method="POST"
          className="mt-4"
          onSubmit={handleSubmitClick}
          noValidate
        >
          {registerFormInputs.map((inputsData) => (
            <Input
              key={inputsData.id}
              id={inputsData.id}
              type={inputsData.type}
              placeholder={inputsData.placeholder}
              data={registerData}
              onDataChange={setRegisterData}
            >
              {inputsData.children}
            </Input>
          ))}

          <div className="flex justify-between md:items-center items-start flex-col md:flex-row">
            <Button
              bgColor="bg-primary"
              textColor="text-white"
              buttonType="submit"
              onButtonClick={(e) => {
                e.preventDefault;
                onSubmit(e);
              }}
            >
              Register
            </Button>
            <div className="lg:text-md text-sm">
              <p>
                Already have an account?
                <Link className="link ml-2" to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default RegisterForm;
