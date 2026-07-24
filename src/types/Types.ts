import "vite/client";

export type Product = {
  _id: string;
  _type: "product";
  name: string;
  description: string;
  price: number;
  isOnSale?: boolean;
  salePrice?: number;
  category: "shirts" | "hoodies" | "pants" | "shoes" | "jackets";
  colorVariants?: ColorVariant[];
  isArchived: boolean;
};

export type ColorVariant = {
  _key: string;
  _type: "colorVariant";
  colorName: string;
  colorHex?: string;
  variantImages: SanityImage[];
  inventory: SizeStock[];
};

export type SanityImage = {
  _key: string;
  _type: "image";
  asset: SanityImageAssetRef;
  url: string;
};

export type SanityImageAssetRef = {
  _ref: string;
  _type: "reference";
};

export type SizeStock = {
  _key: string;
  _type: "sizeStock";
  shirtSize: string;
  pantSize: string;
  shoeSize: string;
  stockCount: number;
};

export type CartItem = {
  cartItemId: `${string}-${number}-${number}`; //productId-colorIdx-sizeIdx
  productId: string;
  colorVariantIdx: number;
  selectedSizeIdx: number;
  quantity: number;

  // snapshot used only on frontend.
  name: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  sizeName: string;
  stockCount: number;
};
