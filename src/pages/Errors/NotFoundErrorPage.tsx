import { NavLink } from "react-router-dom";

function NotFoundErrorPage() {
  return (
    <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-7 sm:px-8 md:px-12 lg:px-16 xl:px-10 py-12 sm:py-16 md:py-20 lg:py-28 space-y-16 sm:space-y-24 text-black dark:text-white">
      <p className="font-bold text-3xl lg:text-5xl mt-12 lg:mt-16 mb-6 lg:mb-10">
        404 - Page Not Found.
      </p>
      <NavLink
        className={
          "text-black text-xl lg:text-2xl border px-2 py-1 bg-white hover:bg-gray-200 rounded-lg hover:scale-105"
        }
        to={"/"}
      >
        Back to home
      </NavLink>
    </div>
  );
}

export default NotFoundErrorPage;
