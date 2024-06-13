import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "./providers/AuthContext";
import Input from "./shared/Input";
import Button from "./shared/Button";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const loginFormInputs = [
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
];

/* eslint-disable react/prop-types */
function LoginForm() {
  return (
    <div>
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-[9999] backdrop-blur-md">
        <div
          className="md:w-[600px] w-[350px] fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 py-10 px-8 shadow-md bg-white
        dark:bg-gray-900 dark:text-white duration-300 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <h2 className="md:text-2xl text-lg font-bold">Login</h2>
            <div>
              <Link to={"/"}>
                <IoMdClose className="text-2xl cursor-pointer" />
              </Link>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}

function Form() {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const navigateTo = useNavigate();

  const methods = useForm();
  const onSubmit = methods.handleSubmit(() => {
    handleSubmitClick();
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleSubmitClick = async () => {
    const payload = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, payload);
      const tokenReceived = response.data.access_token;

      if (response.status === 200 && tokenReceived) {
        localStorage.setItem("token", tokenReceived);
        login();
        navigateTo("/");
      } else {
        setErrors(["Token is missing from the server response"]);
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors || ["An unknown error occurred"]);
      } else {
        setErrors(["An error occurred while communicating with the server"]);
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      {errors && (
        <p className="mt-3 text-red-600 px-2 py-1 bg-red-100 rounded-md">
          Error: {errors}
        </p>
      )}
      <FormProvider {...methods}>
        <form method="POST" className="mt-4" onSubmit={handleSubmitClick}>
          {loginFormInputs.map((loginInputs) => (
            <Input
              key={loginInputs.id}
              id={loginInputs.id}
              type={loginInputs.type}
              placeholder={loginInputs.placeholder}
              data={loginData}
              onDataChange={setLoginData}
            >
              {loginInputs.children}
            </Input>
          ))}

          <div className="flex justify-between md:items-center items-start flex-col md:flex-row ">
            <Button
              bgColor="bg-primary"
              textColor="text-white"
              buttonType="submit"
              onButtonClick={(e) => {
                e.preventDefault;
                onSubmit(e);
              }}
            >
              Login
            </Button>
            <div className="lg:text-md text-sm">
              <p>
                Don{"'"}t have an account?
                <Link className="link ml-2" to={"/register"}>
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default LoginForm;
