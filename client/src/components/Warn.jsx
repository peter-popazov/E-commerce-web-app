/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./shared/Button";

function Warn({ children }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-center items-center gap-4 sm:p-20 p-4 dark:text-gray-400"
    >
      <div className="sm:max-w-[700px] w-full p-6 py-10 bg-white flex gap-4 flex-col items-center rounded-lg shadow-xl dark:bg-gray-800 text-center">
        <h1 className="font-titleFont text-xl font-bold uppercase">
          {children}
        </h1>
        <p className="text-sm text-center px-10 mt-2">
          Continue shopping by clicking on the button below.
        </p>
        <Link to="/products">
          <Button
            bgColor={"bg-primary"}
            textColor={"text-white"}
            rounded={"rounded-xl"}
            onButtonClick={() => {}}
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Warn;
