import { useLoaderData, useParams } from "react-router-dom";
import type { Product } from "../types/Types";
import ShopItem from "../components/ShopItem";

function ShopCategory() {
  const params = useParams();
  const products = useLoaderData<Product[]>();

  return (
    <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-2 py-12 sm:py-16 md:py-20 lg:py-20 space-y-16 sm:space-y-24 text-black dark:text-white">
      <h1>Shop around our {params.category} Collection</h1>
      <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xl:gap-3">
        {products.map(product => (
          <ShopItem key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default ShopCategory;
