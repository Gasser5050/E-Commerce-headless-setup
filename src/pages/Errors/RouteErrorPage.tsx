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
    <div className="grow bg-slate-50 dark:bg-black/80 text-black dark:text-white transition-colors ease-in-out duration-300">
      <div className="container mx-auto py-40 text-center">
        <h1 className="font-bold text-red-500 text-3xl sm:text-4xl mb-4">
          Something went wrong
        </h1>
        <p className="my-5 text-lg sm:text-xl dark:text-white">
          {errorMessage}
        </p>

        <NavLink
          className={
            "text-black text-xl border px-2.5 py-1 bg-gray-200 dark:bg-white hover:bg-white dark:hover:bg-gray-300 rounded-lg duration-100"
          }
          to={"/"}
        >
          Back to home
        </NavLink>
      </div>
    </div>
  );
}

export default RouteErrorPage;
