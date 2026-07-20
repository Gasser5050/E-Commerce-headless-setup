import { useThemeGrabber } from "../hooks/useThemeGrabber";

import { NavLink } from "react-router-dom";
import CollectionCard from "../components/CollectionCard";

const COLLECTIONS = [
  { name: "shirts", label: "Shirts", count: "Classic Fit" },
  { name: "hoodies", label: "Hoodies", count: "Premium Fleece" },
  { name: "pants", label: "Pants", count: "Essentials" },
  { name: "shoes", label: "Shoes", count: "Stepping Out" },
  { name: "jackets", label: "Jackets", count: "New Drops" }
];

function Home() {
  const themeStyle = useThemeGrabber();

  return (
    <div
      className="grow flex flex-col bg-cover bg-center bg-no-repeat transition-bg ease-in-out duration-300"
      style={themeStyle}
    >
      <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-7 sm:px-8 md:px-12 lg:px-16 xl:px-10 py-12 sm:py-16 md:py-20 lg:py-28 space-y-16 sm:space-y-24 text-black dark:text-white">
        <div className="flex flex-col items-start space-y-6 max-w-xl lg:max-w-2xl p-4">
          <span className="max-w-fit text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 overflow-hidden text-nowrap animate-typewriter border-r">
            New Season Collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none drop-shadow-sm">
            Uncompromised Style. <br />
            Built for the Everyday.
          </h1>
          <p className="sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-md leading-relaxed">
            Explore minimalist designs tailored for durability, comfort, and
            premium aesthetic continuity.
          </p>
          <div className="pt-2">
            <NavLink
              to="/shop/shirts"
              className="relative flex items-center justify-center bg-white text-black font-semibold text-sm sm:text-md px-6 py-3.5 rounded-xl cursor-pointer shadow-lg z-0 before:-z-1 before:absolute before:left-0 before:h-full before:w-0 hover:before:w-full before:transform-all before:duration-300 before:ease-in-out overflow-hidden before:bg-linear-to-r before:from-slate-800 dark:before:from-red-500 before:to-blue-500 dark:before:to-red-900 hover:text-white duration-100"
            >
              Explore Catalog
            </NavLink>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col space-y-1 text-center xs:text-left">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Browse Collections
            </h2>
            <p className="text-gray-800 xs:text-zinc-500 text-sm xs:text-xs sm:text-sm  dark:text-zinc-300">
              Select a category to view live inventory levels.
            </p>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {COLLECTIONS.map(col => (
              <CollectionCard key={col.name} col={col} />
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="space-y-2">
            <h4 className="font-bold tracking-tight">Premium Materials</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Sourced from responsible textile mills specializing in heavy-ounce
              cotton blends.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold tracking-tight">
              Live Real-time Inventory
            </h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Direct pipeline to our production warehouse—what you see is
              exactly what is ready to ship.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold tracking-tight">Minimal Footprint</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Eliminating over-packaging and synthetic poly-wraps to honor
              eco-conscious assembly.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
