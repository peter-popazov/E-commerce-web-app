import axios from "axios";
import { useState } from "react";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../utils/constants";
import { IoMdClose } from "react-icons/io";
import Button from "./shared/Button";
import Input from "./shared/Input";
import { useForm, FormProvider } from "react-hook-form";

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
function LoginForm({
  showRegister,
  onShowRegister,
  showLogin,
  onShowLogin,
  onSetAuthenticated,
}) {
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
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={() => onShowLogin(showLogin)}
              />
            </div>
          </div>
          <Form
            showRegister={showRegister}
            onShowRegister={onShowRegister}
            onSetAuthenticated={onSetAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}

function Form({ showRegister, onShowRegister, onSetAuthenticated }) {
  const [errors, setErrors] = useState("");

  const methods = useForm();
  const onSubmit = methods.handleSubmit(() => {
    handleSubmitClick();
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const sendDetailsToServer = () => {
    const payload = {
      username: loginData.username,
      password: loginData.password,
    };
    axios
      .post(API_BASE_URL + "/login", payload)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.access_token);
          redirectToHome();
        } else {
          console.log("Some error occurred");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setErrors(error.response.data.errorMessage || "An error occurred");
        } else if (error.request) {
          setErrors("No response received from the server");
        } else {
          setErrors(error.message);
        }
      });
  };

  const redirectToHome = () => {
    onShowRegister(showRegister);
    onSetAuthenticated(true);
  };

  const handleSubmitClick = () => {
    sendDetailsToServer();
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
                <button
                  className="link ml-2"
                  onClick={() => onShowRegister(showRegister)}
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default LoginForm;
