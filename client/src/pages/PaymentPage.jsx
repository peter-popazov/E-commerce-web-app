import { Link } from "react-router-dom";
import Button from "../components/shared/Button";

function PaymentPage() {
  return (
    <div className="container mx-auto px-4 text-center">
      <div className="p-20">
        <h1 className="text-2xl font-semibold mb-3">
          Payment is only available in production mode.
        </h1>
        <p className="text-lg mb-3">
          But you have received a{" "}
          <span className="font-semibold">confirmation email</span>. Check it
          out!
        </p>
        <Link to="/products">
          <Button
            bgColor={"bg-brandBlue"}
            textColor={"text-white"}
            rounded={"rounded-2xl"}
            onButtonClick={() => {}}
          >
            Explore products
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentPage;
