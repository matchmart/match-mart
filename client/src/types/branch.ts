export interface BranchImage { url: string; publicId: string; }
export interface Branch {
  _id: string;
  name: string;
  slug: string;
  locationName: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  openingHours?: string;
  googleMapEmbedUrl?: string;
  images: BranchImage[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface BranchFormValues {
  name: string;
  locationName: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  openingHours?: string;
  googleMapEmbedUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
}
