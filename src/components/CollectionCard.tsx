import { NavLink } from "react-router-dom";

type Collection = {
  name: string;
  label: string;
  count: string;
};

function CollectionCard({ col }: { col: Collection }) {
  return (
    <li>
      <NavLink
        to={`/shop/${col.name}`}
        className="group relative flex flex-col justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-4 sm:pb-5 h-40 sm:h-45 rounded-2xl border border-black/20 dark:border-white/20 bg-white/80 xs:bg-black/5 dark:bg-white/5 hover:bg-white/15 dark:hover:bg-black/10 backdrop-blur-md transition-all duration-300 shadow-xs"
      >
        <div className="flex flex-col space-y-2">
          <span className="text-xs sm:text-sm lg:text-xs sm:tracking-tight font-medium text-zinc-600 dark:text-zinc-300">
            {col.count}
          </span>
          <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-xl font-bold tracking-tight">
            {col.label}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="relative text-xs xs:text-sm sm:text-md lg:text-sm font-mono tracking-tighter pb-1 opacity-80 group-hover:opacity-100 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-px sm:after:h-0.5 lg:after:h-px after:w-0 after:bg-current group-hover:after:w-full after:transition-all after:ease-in-out after:duration-400">
            View Store
          </span>
          <div className="mr-1 border bg-white dark:bg-white/90 text-black p-1.5 rounded-full mb-1">
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

export default CollectionCard;
