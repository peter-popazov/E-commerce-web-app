/* eslint-disable react/prop-types */
function Button({
  children,
  bgColor,
  textColor,
  onButtonClick,
  buttonType,
  rounded,
  value,
}) {
  return (
    <button
      type={buttonType}
      value={value}
      onClick={
        buttonType === "submit" ? onButtonClick : () => onButtonClick(value)
      }
      className={`${bgColor} ${textColor} cursor-pointer
        hover:scale-105 duration-300 my-2 py-2 px-8 ${
          rounded ? rounded : "rounded-full"
        } 
        relative z-[9000] font-semibold border-black`}
    >
      {children}
    </button>
  );
}

export default Button;
