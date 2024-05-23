import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to={"/"}
      className="text-primary font-semibold tracking-widerst 
        text-2xl uppercase sm:text-3xl mr-4"
    >
      ESHOP
    </Link>
  );
}
export default Logo;
