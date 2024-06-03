import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { MdError } from "react-icons/md";
import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";

/* eslint-disable react/prop-types */
function Input({ children, type, id, placeholder, data, onDataChange }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {children}
      </label>
      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={data[id]}
        {...register(id, {
          required: {
            value: true,
            message: "This property should not be empty",
          },

          ...(id === "username" && {
            minLength: {
              value: 3,
              message: "Username should contain more than 3 symbols",
            },
          }),

          ...(id === "userEmailRegister" && {
            pattern: {
              value:
                /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)+|\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])$/,
              message: "Enter valid email",
            },
          }),

          ...(["password", "confirmPassword"].includes(id) && {
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Minimum 8 characters, including one uppercase, one lowercase, one number, and one special symbol",
            },
          }),

          ...(id === "confirmPassword" && {
            validate: (value) => {
              if (id === "confirmPassword" && value !== data.password) {
                return "Passwords do not match";
              }
              return true;
            },
          }),
        })}
        className="form-input"
        onChange={(e) =>
          onDataChange((prevState) => ({
            ...prevState,
            [id]: e.target.value,
          }))
        }
      />
    </div>
  );
}

function InputError({ message }) {
  return (
    <motion.p
      className="flex items-center gap-2 text-red-600 px-2 py-1 bg-red-100 rounded-sm"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default Input;
