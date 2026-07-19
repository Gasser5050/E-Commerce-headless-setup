import type { Product } from "../types/Types";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function ProductPage() {
  const product = useLoaderData<Product>();

  const [activeColorVariantIdx, setActiveColorVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const currentImgUrl =
    product.colorVariants?.[activeColorVariantIdx].variantImages?.[
      activeImageIdx
    ].url;

  useEffect(() => {
    if (!product.colorVariants) return;
    const preloadedImages: HTMLImageElement[] = [];

    product.colorVariants.forEach(variant => {
      variant.variantImages?.forEach(variantImg => {
        const url = variantImg.url;

        if (url) {
          const img = new Image();
          img.src = url;

          preloadedImages.push(img);
        }
      });
    });

    return () => {
      preloadedImages.length = 0;
    };
  }, [product.colorVariants]);

  // md
  return (
    <div className="text-black dark:text-white space-y-1.25 px-4 xs:px-6 sm:px-8 md:px-2 lg:px-10 xl:px-15 py-8 md:py-18 ">
      {/* Product Details - Hidden on md screens */}
      <div className="md:hidden pb-px">
        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight">
          {product.name}
        </h1>
        <p className="text-sm xs:text-md">{product.description}</p>
      </div>

      {/* Image Gallery */}
      <div className="md:flex md:space-x-4 lg:space-x-5 xl:space-x-8">
        <div className="md:w-[60%] lg:w-[55%] xl:w-1/2 flex flex-col justify-center space-y-1.5 md:space-y-1">
          <div className="flex flex-col items-center w-full">
            <img
              src={currentImgUrl}
              alt=""
              className="w-full h-70 xs:h-85 sm:h-90 lg:h-100 xl:h-105 object-cover border dark:border-white/30 rounded-lg"
            />

            <ul className="flex space-x-px">
              {product.colorVariants?.[activeColorVariantIdx].variantImages.map(
                (_, index) => {
                  return (
                    <li>
                      <button
                        onClick={() => {
                          setActiveImageIdx(index);
                        }}
                        className={`${activeImageIdx === index ? "bg-zinc-600" : "bg-neutral-400"} border  w-2 h-2 rounded-full cursor-pointer`}
                      ></button>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          <ul className="flex justify-start space-x-1">
            {product.colorVariants?.map((variant, index) => {
              return (
                <li key={variant._key}>
                  <button
                    onClick={() => {
                      setActiveColorVariantIdx(index);
                      setActiveImageIdx(0);
                    }}
                    className="rounded-md hover:outline cursor-pointer"
                  >
                    <img
                      src={variant.variantImages[0].url}
                      alt=""
                      className="rounded-md w-15 h-12 xs:w-20 xs:h-15"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Product Details - Shown on md screens */}
        <div className="hidden md:flex w-[40%] lg:w-[45%] xl:w-1/2  flex-col justify-between">
          <div>
            <h1 className="text-3xl font-mono tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg">{product.description}</p>

            {/* Product Pricing - Shown on md screens */}
            <p className="pt-2">
              {product.isOnSale ? (
                <span className="flex flex-col">
                  <div className="space-x-1">
                    <span className="text-xl font-bold text-red-700">
                      -
                      {Math.floor(
                        ((Number(product.price) - Number(product.salePrice)) /
                          Number(product.price)) *
                          100
                      )}
                      %
                    </span>

                    <span className="font-black text-2xl tracking-tight">
                      ${product.salePrice}
                    </span>
                  </div>

                  <span className="font-black text-lg text-neutral-600">
                    Was <span className="line-through">${product.price}</span>
                  </span>
                </span>
              ) : (
                <span className="font-black md:text-2xl tracking-tight">
                  ${product.price}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col">
            <span className="block font-black md:text-sm text-md text-green-500">
              In Stock
            </span>

            <button className="py-1.5 rounded-md xs:rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 duration-150 ease-in-out cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Pricing - Hidden on md screens */}
      <div className="flex flex-col md:hidden">
        <p>
          {product.isOnSale ? (
            <span className="flex flex-col">
              <div className="text-xl xs:text-2xl tracking-tight space-x-1">
                <span className="font-bold text-red-700">
                  -
                  {Math.floor(
                    ((Number(product.price) - Number(product.salePrice)) /
                      Number(product.price)) *
                      100
                  )}
                  %
                </span>

                <span className="font-black">${product.salePrice}</span>
              </div>

              <span className="font-black ml-0.75 text-sm xs:text-md sm:text-lg md:text-xl text-neutral-500">
                Was <span className="line-through">${product.price}</span>
              </span>
            </span>
          ) : (
            <span className="font-black text-xl xs:text-2xl tracking-tight">
              ${product.price}
            </span>
          )}
        </p>

        <span className="text-sm xs:text-md font-black text-green-500">
          In Stock
        </span>

        <button className="py-1 xs:py-1.5 rounded-lg xs:rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 duration-150 ease-in-out cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;

{
  /* <div className="hidden">
  <h1 className="xs:text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
    {product.name}
  </h1>

  <p className="text-sm xs:text-lg sm:text-xl md:text-2xl tracking-tight">
    {product.isOnSale ? (
      <span>
        ${product.salePrice}
        <span className="ml-0.75 text-sm xs:text-md sm:text-lg md:text-xl text-neutral-500">
          Was <span className="line-through"> ${product.price} </span>
        </span>
      </span>
    ) : (
      <span>${product.price}</span>
    )}
  </p>
</div>; */
}
