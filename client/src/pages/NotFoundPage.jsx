import Button from "../components/shared/Button";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <Link to={"/"}>
        <Button
          bgColor={"bg-blue-600"}
          textColor={"text-white"}
          rounded={"rounded-xl"}
        >
          Go Home!
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
