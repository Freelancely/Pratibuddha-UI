// src/app/types/product-type.ts
export interface IReview {
  user?: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  date: string;
}

export interface IOfferDate {
  endDate?: string;
}

export interface IColor {
  clrCode?: string;
  name?: string;
}

export interface IProductImage {
  img: string;
  color?: IColor;
}

export interface ICategory {
  name: string;
}

export interface IProduct {
  productId: string;
  productName: string;
  productDescription: string;
  productImageUrl: IProductImage[];
  productUnitPrice?: number;
  discountId?: string | null;
  discountedPrice?: number | null;
  discountPercentage?: number | null;
  productQuantity?: number;
  orderQuantity?: number;
  categoryId?: string;
  categoryName?: string;
  subCategoryId?: string;
  subCategoryName?: string;
  sales?: number;
  sellCount?: number;
  productStatus?: string;
  avgRating?: number;
  reviewCount?: number;
  hotdeals?: boolean;
  attributes?: any;
  parent?: string;
  children?: string;
  brand?: { name: string };
  price?: number;
  status?: string;
  discount?: number;
  quantity?: number;
  reviews?: IReview[];
  additionalInformation?: { key: string; value: string }[];
  productType?: string;
  offerDate?: IOfferDate;
  sku?: string;
  tags?: string[];
  featured?: boolean;
  sizes?: string[];
  category?: ICategory;
  slug?: string;
  unit?: string;
  img?: string; // Added to match data with single image
}
