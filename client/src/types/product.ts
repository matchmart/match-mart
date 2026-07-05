import type { Category } from "./category";
export interface ProductImage { url: string; publicId: string; }
export type ProductStatus = "active" | "inactive";
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountPrice?: number;
  category: Category | string;
  stock: number;
  sizes: string[];
  colors: string[];
  images: ProductImage[];
  isFeatured: boolean;
  isNewArrival: boolean;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}
export interface ProductFormValues {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  category: string;
  stock: number;
  sizes?: string;
  colors?: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  status: ProductStatus;
}
export interface ProductFilters { search?: string; category?: string; status?: string; isFeatured?: boolean; isNewArrival?: boolean; }
