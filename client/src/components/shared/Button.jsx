/* eslint-disable react/prop-types */
function Button({ children, bgColor, textColor }) {
  return (
    <button
      className={`${bgColor} ${textColor} cursor-pointer
        hover:scale-105 duration-300 my-2 py-2 px-8 rounded-full
        relative z-[999] font-semibold border-black`}
    >
      {children}
    </button>
  );
}

export default Button;
