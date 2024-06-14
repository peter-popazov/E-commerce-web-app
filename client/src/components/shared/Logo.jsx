import { Link } from "react-router-dom";
import "/src/app.css";

function Logo() {
  return (
    <Link
      to={"/"}
      className="logo-text font-bold tracking-widerst text-2xl uppercase sm:text-3xl mr-4"
    >
      EASYBUY
    </Link>
  );
}

export default Logo;
