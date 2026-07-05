export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  imagePublicId?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface CategoryFormValues { name: string; description?: string; isActive: boolean; }
