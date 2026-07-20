import axios from "axios";
import type { Product } from "../types/Types";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ShopItem from "../components/ShopItem";

type initialData = {
  products: Product[];
  hasMore: boolean;
};

function ShopCategory() {
  const params = useParams();
  const initialData = useLoaderData<initialData>();

  const [products, setProducts] = useState<Product[]>(initialData.products);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  async function loadMore() {
    setLoading(true);

    try {
      const response = await axios.get("/api/get-shop-items", {
        params: {
          category: params.category?.toLowerCase(),
          page: page + 1,
          limit: 2
        }
      });

      setProducts(currentProducts => [
        ...currentProducts,
        ...response.data.products
      ]);
      setHasMore(response.data.hasMore);
      setPage(p => p + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Could not connect to server.";

        setError(errorMessage);
      } else {
        setError("An unexpected application error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grow bg-slate-300 dark:bg-black/80 text-black dark:text-white transition-colors ease-in-out duration-300">
      <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-2 py-12 sm:py-16 md:py-20 lg:py-20 space-y-12">
        <h1 className="text-center text-xl xs:text-2xl sm:text-3xl md:text-4xl font-serif tracking-tighter">
          Shop around our {params.category}{" "}
          <span className="text-cyan-800 dark:text-cyan-500">collection</span>
        </h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4">
          {products.map(product => (
            <ShopItem key={product._id} product={product} />
          ))}
        </ul>
        {hasMore && (
          <div className="text-center text-black">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-white border px-2 py-1 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "loading..." : "Load More"}
            </button>
          </div>
        )}

        {error && (
          <p className="flex items-center justify-center gap-1 max-w-md lg:max-w-lg mx-auto px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-full text-sm font-medium tracking-tight shadow-sm">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ShopCategory;
