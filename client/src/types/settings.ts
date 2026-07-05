export interface WebsiteSettings {
  _id: string;
  websiteName: string;
  logoUrl?: string;
  logoPublicId?: string;
  faviconUrl?: string;
  faviconPublicId?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  messenger?: string;
  googleMapEmbedUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UpdateSettingsPayload = Partial<
  Omit<
    WebsiteSettings,
    | "_id"
    | "logoUrl"
    | "logoPublicId"
    | "faviconUrl"
    | "faviconPublicId"
    | "createdAt"
    | "updatedAt"
  >
>;
