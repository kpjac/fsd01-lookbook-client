import { useEffect } from "react";
import { Link} from 'react-router-dom';

function ErrorPage() {
  useEffect(() => {
    document.title = "Not Found - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
    <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
      <p className="text-center text-4xl text-red-500">404 Error!</p>
      <p className="text-center text-2xl">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
    <p className="text-sm">
      {` `}
      <Link to="/" className="underline text-green-500 hover:text-green-600 transition duration-300 ease-in-out text-3xl">
      Go to home page
      </Link>
    </p>
  </div>
  </div>
  );
}

export default ErrorPage;
