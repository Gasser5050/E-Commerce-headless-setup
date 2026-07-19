import { useThemeGrabber } from "../hooks/useThemeGrabber";

import category from "../assets/json/categories.json";
import CategoryCard from "../components/CategoryCard";

function Shop() {
  const themeStyle = useThemeGrabber();

  return (
    <div
      className="grow flex flex-col bg-cover bg-center bg-no-repeat transition-bg ease-in-out duration-300"
      style={themeStyle}
    >
      <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-7 sm:px-8 md:px-12 lg:px-16 xl:px-10 py-12 sm:py-16 md:py-20 lg:py-20 space-y-16 sm:space-y-24 text-black dark:text-white">
        <div className="flex flex-col items-start space-y-6 px-4 pt-4 xl:pt-6 pb-2 xl:pb-4">
          <span className="max-w-fit text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 overflow-hidden text-nowrap animate-typewriter border-r">
            Check out our new collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            The Storefront Catalog
          </h1>
          <p className="sm:text-lg xl:text-xl text-zinc-700 dark:text-zinc-300 max-w-lg leading-relaxed">
            Select a dedicated product gateway below to access our live,
            factory-direct inventory levels and sizing matrices.
          </p>
        </div>

        <section className="mb-4 sm:mb-0">
          <h2 className="sr-only">Featured Catalogs</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
            {category.map((cat, index) => {
              return (
                <CategoryCard
                  key={cat.name}
                  cat={cat}
                  index={index}
                  lastCategory={category.length - 1}
                />
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Shop;
