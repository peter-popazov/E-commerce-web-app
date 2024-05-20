/* eslint-disable react/prop-types */
function Main({ children }) {
  return (
    <div
      className="bg-white dark:bg-gray-900 dark:text-white
duration-200 overflow-hidden"
    >
      {children}
    </div>
  );
}

export default Main;
