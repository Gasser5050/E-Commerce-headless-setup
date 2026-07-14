import { useRouteError, isRouteErrorResponse, NavLink } from "react-router-dom";

function RouteErrorPage() {
  const error = useRouteError();
  let errorMessage = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}: ${error.data || "Network Response Error"}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="container mx-auto py-40 text-center text-black">
      <h1 className="font-bold text-red-500 text-3xl sm:text-4xl mb-4">
        Something went wrong
      </h1>
      <p className="my-5 text-lg sm:text-xl dark:text-white">{errorMessage}</p>

      <NavLink
        className={
          "text-xl border px-2.5 py-1 bg-white hover:bg-gray-200 rounded-lg"
        }
        to={"/"}
      >
        Back to home
      </NavLink>
    </div>
  );
}

export default RouteErrorPage;
