import { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative flex items-center">
      <button onClick={handleToggle} className="group">
        {darkMode ? (
          <MdOutlineDarkMode
            className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400
            right-3 duration-200"
          />
        ) : (
          <MdOutlineLightMode
            className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400
            right-3 duration-200"
          />
        )}
      </button>
    </div>
  );
}

export default DarkMode;
