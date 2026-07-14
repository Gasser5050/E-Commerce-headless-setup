import { NavLink } from "react-router-dom";

type Category = {
  name: string;
  title: string;
  tagline: string;
  meta: string;
};

function CategoryCard({
  cat,
  index,
  lastCategory
}: {
  cat: Category;
  index: number;
  lastCategory: number;
}) {
  return (
    <li className={`${index === lastCategory ? "md:col-span-2" : ""}`}>
      <NavLink
        to={cat.name}
        className="group flex flex-col justify-between pt-5 px-5 sm:px-6 md:px-5 h-55 sm:h-60 border border-black/20 dark:border-white/20 bg-white/60 dark:bg-white backdrop-blur-md transition-all duration-300 shadow-xs rounded-2xl hover:scale-[1.03]"
      >
        <div className="flex flex-col justify-between space-y-2">
          <div className="flex justify-between dark:text-neutral-600">
            <span className="text-xs text-neutral-500 font-semibold">
              {cat.meta}
            </span>
            <span className="text-xxs px-1.5 py-0.5 border bg-black/5 border-black/20 dark:border-black/30 font-mono uppercase rounded-sm">
              Live Storage link
            </span>
          </div>

          <div className="flex flex-col space-y-2 md:space-y-3">
            <h3
              className={`${index === lastCategory ? "md:text-3xl" : ""} text-2xl sm:text-3xl md:text-2xl font-extrabold tracking-tighter dark:text-black`}
            >
              {cat.title}
            </h3>
            <p
              className={`${index === lastCategory ? "md:text-md" : ""} text-xs sm:text-sm text-neutral-600 dark:text-neutral-700`}
            >
              {cat.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-t-black/10 dark:border-t-black/20">
          <span className="relative text-xs font-semibold tracking-widest pb-1 dark:text-black after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-px after:w-0 after:bg-current group-hover:after:w-full after:transition-all after:ease-in-out after:duration-400">
            ENTER SUB-CATALOG
          </span>
          <div className="mr-1 border bg-white dark:bg-black/5 text-black p-1.5 rounded-full ">
            <svg
              className="w-4 h-4 group-hover:animate-arrow-forward"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </NavLink>
    </li>
  );
}

export default CategoryCard;
