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
  stockCount: number;
};
