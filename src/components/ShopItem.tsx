import { useEffect, useState } from "react";
import { getSwatchColor } from "../utils/getSwatchColor";
import type { Product } from "../types/Types";

function ShopItem({ product }: { product: Product }) {
  const [activeColorVariantIdx, setActiveColorVariantIdx] = useState(0); // current selected color
  const [activeImageIdx, setActiveImageIdx] = useState(0); // current selected img

  const currentColorVariation = product.colorVariants?.[activeColorVariantIdx];
  const currentVariantImg =
    currentColorVariation?.variantImages?.[activeImageIdx].url || "";

  function handleColorChange(index: number) {
    setActiveColorVariantIdx(index);
    setActiveImageIdx(0);
  }

  useEffect(() => {
    if (!product.colorVariants) return;
    const preloadedImages: HTMLImageElement[] = [];

    product.colorVariants.forEach((variant, index) => {
      if (index === activeColorVariantIdx) return;
      const url = variant.variantImages?.[0]?.url;

      if (url) {
        const img = new Image();
        img.src = url;
        preloadedImages.push(img);
      }
    });

    return () => {
      preloadedImages.length = 0;
    };
  }, [product.colorVariants, activeColorVariantIdx]);

  return (
    <li className="flex flex-col text-black dark:text-black space-y-0.5 bg-zinc-200 rounded-md border dark:border-white">
      <div className="flex flex-col space-y-px">
        <img
          src={currentVariantImg}
          alt=""
          className="aspect-square object-cover rounded-t-md"
        />
        <ul className="flex space-x-1 px-1 pt-0.5 line-clamp-1">
          {product.colorVariants?.map((variant, index) => (
            <li key={variant._key}>
              <button
                onClick={() => handleColorChange(index)}
                className={`${activeColorVariantIdx === index ? "ring-1 ring-black" : ""} border border-black/50 w-4 h-4 rounded-full hover:scale-105 cursor-pointer`}
                style={{
                  backgroundColor: getSwatchColor(
                    variant.colorName,
                    variant.colorHex
                  )
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-1.5 pb-0.5">
        <h2 className="xs:text-lg sm:text-xl md:text-lg font-semibold tracking-tighter">
          {product.name}
        </h2>
        <p className="text-sm xs:text-md sm:text-lg md:text-md tracking-tighter">
          ${product.isOnSale ? product.salePrice : product.price}
        </p>
      </div>
    </li>
  );
}

export default ShopItem;
