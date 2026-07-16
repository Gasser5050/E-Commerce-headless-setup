import { useState } from "react";
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

  return (
    <li className="flex flex-col text-black space-y-0.5 bg-white/30 backdrop-blur-md dark:bg-zinc-200 h-full rounded-sm">
      <div className="flex flex-col space-y-px">
        <img
          src={currentVariantImg}
          alt=""
          className="aspect-video object-cover rounded-t-sm"
        />
        <ul className="flex space-x-1 px-1 pt-0.5">
          {product.colorVariants?.map((variant, index) => (
            <li key={variant._key}>
              <button
                onClick={() => handleColorChange(index)}
                className={`${activeColorVariantIdx === index ? "ring-2 ring-white" : ""} border w-4 h-4 rounded-full hover:scale-105 cursor-pointer`}
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
