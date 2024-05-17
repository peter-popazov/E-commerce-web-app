import { IoMdClose } from "react-icons/io";
import Button from "../shared/Button";

/* eslint-disable react/prop-types */
function LoginForm({ showRegister, onShowRegister, showLogin, onShowLogin }) {
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

          <form action="" className="mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="userEmail" className="font-semibold">
                Email
              </label>
              <input
                id="userEmail"
                type="email"
                placeholder="example@example.com"
                className="form-input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Required"
                className="form-input"
              />
            </div>
            <div className="flex justify-between items-center flex-row">
              <Button bgColor="bg-primary" textColor="text-white">
                Login
              </Button>
              <div className="text-sm">
                <p>Don{"'"}t have an account?</p>
                <button
                  className="link"
                  onClick={() => onShowRegister(showRegister)}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
