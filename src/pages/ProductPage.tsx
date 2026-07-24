import { useEffect, useRef, useState } from "react";
import type { Product, CartItem } from "../types/Types";
import { cn } from "../utils/cn";
import { useLoaderData } from "react-router-dom";
import DropDownBox from "../components/DropDownBox";
import { useCartContext } from "../hooks/useCartContext";

function ProductPage() {
  const product = useLoaderData<Product>();

  const [activeColorVariantIdx, setActiveColorVariantIdx] = useState(0);
  const [activeSelectedSizeIdx, setActiveSelectedSizeIdx] = useState<
    number | null
  >(null);
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const { addToCart } = useCartContext();

  const totalStockCount =
    activeSelectedSizeIdx !== null
      ? (product.colorVariants?.[activeColorVariantIdx]?.inventory?.[
          activeSelectedSizeIdx
        ]?.stockCount ?? 0)
      : 0;

  const mobileScrollRef = useRef<HTMLUListElement>(null);

  const discountPercentage =
    product.price && product.isOnSale && product.salePrice
      ? Math.floor(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  function addToCartButton() {
    if (activeSelectedSizeIdx === null) return;

    const cartItem: CartItem = {
      cartItemId: `${product._id}-${activeColorVariantIdx}-${activeSelectedSizeIdx}`,
      productId: product._id,
      colorVariantIdx: activeColorVariantIdx,
      selectedSizeIdx: activeSelectedSizeIdx,
      quantity: selectedItemQuantity
    };

    const stock =
      product?.colorVariants?.[activeColorVariantIdx]?.inventory?.[
        activeSelectedSizeIdx
      ]?.stockCount || 0;
      
    addToCart(cartItem, stock);
  }

  function handleMobileIndicatorClick(index: number) {
    setActiveImageIdx(index);

    if (mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const imageWidth = container.clientWidth;

      container.scrollTo({
        left: index * imageWidth,
        behavior: "smooth"
      });
    }
  }

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

  return (
    <div className="grow bg-white-200 dark:bg-black/80 text-black dark:text-white transition-colors ease-in-out duration-300">
      <div className="text-black dark:text-white space-y-1.25 px-4 xs:px-6 sm:px-8 md:px-2 lg:px-10 xl:px-15 py-7 md:py-14 ">
        {/* Product Details - Hidden on md screens */}
        <div className="md:hidden pb-1.5">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="text-sm xs:text-md py-1">{product.description}</p>
        </div>

        {/* Image Gallery */}
        <div className="md:flex md:space-x-4 lg:space-x-5 xl:space-x-8">
          {/* Img */}
          <div className="md:w-[60%] lg:w-[55%] xl:w-1/2 flex flex-col justify-center space-y-1">
            <ul
              ref={mobileScrollRef}
              onScroll={e => {
                const container = e.currentTarget;
                const scrollLeft = container.scrollLeft;
                const width = container.clientWidth;
                if (width > 0) {
                  const scrolledIndex = Math.round(scrollLeft / width);
                  setActiveImageIdx(scrolledIndex);
                }
              }}
              className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide rounded-lg border dark:border-white/30"
            >
              {product.colorVariants?.[activeColorVariantIdx].variantImages.map(
                img => {
                  return (
                    <li
                      key={img._key}
                      className="bg-white w-full px-15 xs:px-25 sm:px-35 md:px-15 xl:px-30 shrink-0 snap-center"
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-70 xs:h-85 sm:h-90 lg:h-100 xl:h-105 object-cover"
                      />
                    </li>
                  );
                }
              )}
            </ul>
            <ul className="flex space-x-0.5 self-center">
              {product.colorVariants?.[activeColorVariantIdx].variantImages.map(
                (img, index) => {
                  const isActive = activeImageIdx === index;

                  return (
                    <li key={img._key}>
                      <button
                        onClick={() => handleMobileIndicatorClick(index)}
                        onMouseEnter={() => handleMobileIndicatorClick(index)}
                        className="relative flex items-center w-3 h-3 cursor-pointer"
                      >
                        <span
                          className={cn(
                            "absolute left-1/2 bottom-0 -translate-x-1/2 h-1.75 rounded-full ease-in-out duration-150",
                            isActive
                              ? "bg-zinc-800 dark:bg-white w-4"
                              : "bg-gray-400/80 dark:bg-zinc-500 w-2"
                          )}
                        ></span>
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
            <p className="font-bold pt-2 tracking-tight leading-7">
              Choose from the available colors below.
            </p>
            <ul className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 gap-1.25">
              {product.colorVariants?.map((variant, index) => {
                const isActive = activeColorVariantIdx === index;

                return (
                  <li key={variant._key}>
                    <button
                      onClick={() => {
                        setActiveColorVariantIdx(index);
                        handleMobileIndicatorClick(0);
                        setActiveSelectedSizeIdx(null);
                        setSelectedItemQuantity(1);
                      }}
                      className={cn(
                        "xs:px-5.5 sm:px-6 md:px-3.25 lg:px-4.25 xl:px-5.25 rounded-md overflow-hidden cursor-pointer",
                        isActive
                          ? "outline-3 outline-zinc-800 dark:outline-white scale-105"
                          : "opacity-80 hover:opacity-100"
                      )}
                    >
                      <img
                        src={variant.variantImages[0].url}
                        alt=""
                        className="rounded-md w-15 h-12 xs:w-20 xs:h-15 object-cover"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Product - Shown on md screens */}
          <div className="hidden md:flex w-[40%] lg:w-[45%] xl:w-1/2  flex-col justify-between">
            {/* Product Details - Shown on md screens */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-mono tracking-tight">
                  {product.name}
                </h1>
                <p className="text-md xl:text-lg py-2">{product.description}</p>
              </div>

              {/* Sizes / Quantity */}
              <div className="space-y-3">
                {/* Sizes */}
                <div className="">
                  <p className="font-bold tracking-tight leading-7">
                    Select Size
                  </p>
                  <ul className="grid grid-cols-3 gap-2">
                    {product.colorVariants?.[
                      activeColorVariantIdx
                    ].inventory.map((size, index) => {
                      return (
                        <li key={size._key} className="flex">
                          <button
                            onClick={() => {
                              if (size.stockCount === 0) return;
                              setActiveSelectedSizeIdx(index);
                              setSelectedItemQuantity(1);
                            }}
                            className={cn(
                              "grow py-1 text-center border border-black/20 dark:border-white/25 hover:border-black dark:hover:border-white rounded-sm cursor-pointer",
                              activeSelectedSizeIdx === index
                                ? "border-black dark:border-white"
                                : "",
                              size.stockCount === 0
                                ? "opacity-40 line-through border-black/20 hover:border-black/20 pointer-events-none"
                                : ""
                            )}
                          >
                            {size.shirtSize ??
                              size.pantSize ??
                              size.shoeSize ??
                              "N/A"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-2">
                  <DropDownBox
                    key={`${activeColorVariantIdx}-${activeSelectedSizeIdx}`}
                    placeholder="Quantity: "
                    listSize={totalStockCount}
                    selectedValue={selectedItemQuantity}
                    updateSelectedValue={setSelectedItemQuantity}
                    disabled={activeSelectedSizeIdx === null}
                  />

                  {totalStockCount !== 0 && totalStockCount <= 4 && (
                    <p className="text-red-500">
                      Only {totalStockCount} left in stock.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Pricing - Shown on md screens */}
            <div className="flex flex-col space-y-2">
              <div className="flex w-fit items-center space-x-2 border px-2.5 rounded-2xl">
                {product.isOnSale ? (
                  <span className="flex items-center space-x-1 lg:space-x-1.5 xl:space-x-2">
                    <span className="text-neutral-500 text-lg xl:text-2xl line-through">
                      ${product.price}
                    </span>
                    <span className="font-semibold text-2xl xl:text-3xl tracking-tight">
                      ${product.salePrice}
                    </span>
                    <span className="text-lg xl:text-xl text-green-600 tracking-tighter">
                      {discountPercentage}% OFF
                    </span>
                  </span>
                ) : (
                  <span className="font-black text-xl xs:text-2xl tracking-tight">
                    ${product.price}
                  </span>
                )}

                <span className="block font-black text-lg lg:text-xl text-green-500 tracking-wide">
                  In Stock
                </span>
              </div>

              {/* Purchase Buttons */}
              <div className="flex space-x-1 lg:space-x-2 xl:space-x-2.25">
                <button
                  onClick={addToCartButton}
                  disabled={activeSelectedSizeIdx === null}
                  className={cn(
                    "grow py-1.5 rounded-md xs:rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 duration-150 ease-in-out cursor-pointer",
                    activeSelectedSizeIdx === null &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  Add to Cart
                </button>
                <button className="grow py-1.5 rounded-md xs:rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 duration-150 ease-in-out cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Size/Pricing - Hidden on md screens */}
        <div className="flex flex-col md:hidden mt-2.25 space-y-2">
          {/* Size */}
          <div className="mb-3.5">
            <p className="font-bold tracking-tight leading-7">Select Size</p>
            <ul className="grid grid-cols-3 gap-2">
              {product.colorVariants?.[activeColorVariantIdx].inventory.map(
                (size, index) => {
                  return (
                    <li key={size._key} className="flex">
                      <button
                        onClick={() => {
                          if (size.stockCount === 0) return;
                          setActiveSelectedSizeIdx(index);
                          setSelectedItemQuantity(1);
                        }}
                        className={cn(
                          "grow py-1 text-center border border-black/20 dark:border-white/25 hover:border-black dark:hover:border-white rounded-sm cursor-pointer",
                          activeSelectedSizeIdx === index
                            ? "border-black dark:border-white"
                            : "",
                          size.stockCount === 0
                            ? "opacity-40 line-through border-black/20 hover:border-black/20 pointer-events-none"
                            : ""
                        )}
                      >
                        {size.shirtSize ??
                          size.pantSize ??
                          size.shoeSize ??
                          "N/A"}
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            {/* Drop Down Box */}
            <div className="flex items-center space-x-1 xs:space-x-px sm:space-x-2">
              <DropDownBox
                key={`${activeColorVariantIdx}-${activeSelectedSizeIdx}`}
                placeholder="Quantity: "
                listSize={totalStockCount}
                selectedValue={selectedItemQuantity}
                updateSelectedValue={setSelectedItemQuantity}
                isPositionedUp
                disabled={activeSelectedSizeIdx === null}
              />

              {totalStockCount !== 0 && totalStockCount <= 4 && (
                <p className="text-xs xs:text-sm sm:text-md text-red-500 tracking-tighter sm:tracking-normal">
                  Only {totalStockCount} left in stock.
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-0.5  sm:space-x-2 border px-1.5 sm:px-2.5 rounded-2xl">
              {product.isOnSale ? (
                <div className="flex items-center space-x-1">
                  <span className="text-neutral-500 text-sm xs:text-md sm:text-xl line-through">
                    ${product.price}
                  </span>
                  <span className="font-semibold text-md sm:text-xl tracking-tight">
                    ${product.salePrice}
                  </span>
                  <span className="text-green-600 tracking-tighter hidden xs:block xs:text-sm sm:text-md">
                    {discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="font-black text-xl xs:text-2xl tracking-tight">
                  ${product.price}
                </span>
              )}
              <span className="text-sm xs:text-sm sm:text-lg font-black text-green-500 tracking-wide xs:tracking-normal">
                In Stock
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex justify-between space-x-1 sm:space-x-2">
            <button
              onClick={addToCartButton}
              disabled={activeSelectedSizeIdx === null}
              className={cn(
                "grow py-1 xs:py-1.5 rounded-lg xs:rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 duration-150 ease-in-out cursor-pointer",
                activeSelectedSizeIdx === null &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              Add to Cart
            </button>
            <button className="grow py-1 xs:py-1.5 rounded-lg xs:rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 duration-150 ease-in-out cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
