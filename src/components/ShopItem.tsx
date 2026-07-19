import { useEffect, useState } from "react";
import { getSwatchColor } from "../utils/getSwatchColor";
import type { Product } from "../types/Types";
import { NavLink } from "react-router-dom";

function ShopItem({ product }: { product: Product }) {
  const [activeColorVariantIdx, setActiveColorVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const currentImgUrl =
    product.colorVariants?.[activeColorVariantIdx]?.variantImages?.[
      activeImageIdx
    ].url || "";

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
        <NavLink to={product._id} className={"overflow-hidden"}>
          <img
            src={currentImgUrl}
            alt=""
            className="aspect-square object-cover rounded-t-md hover:scale-[1.04] duration-150 ease-in-out"
          />
        </NavLink>

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
        <h2 className="xs:text-lg sm:text-xl md:text-lg font-semibold tracking-tighter hover:text-orange-400 duration-100 w-fit line-clamp-1">
          <NavLink to={product._id}>{product.name}</NavLink>
        </h2>

        <div className="flex items-center justify-between">
          <p className="w-fit text-sm xs:text-md sm:text-lg md:text-md tracking-tighter">
            <NavLink to={product._id}>
              {product.isOnSale ? (
                <span>
                  ${product.salePrice}
                  <span className="ml-0.75 text-xs xs:text-sm sm:text-md md:text-sm text-neutral-500">
                    Was <span className="line-through"> ${product.price} </span>
                  </span>
                </span>
              ) : (
                <span>${product.price}</span>
              )}
            </NavLink>
          </p>

          <div className="pb-1 xs:pb-1.5 xs:pr-0.5 text-xs xs:text-sm sm:text-md md:text-md">
            <button className="px-1.5 xs:px-2 py-1 rounded-md xs:rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 duration-150 ease-in-out cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ShopItem;
