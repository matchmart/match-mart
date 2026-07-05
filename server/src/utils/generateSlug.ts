import type mongoose from "mongoose";
export const generateSlug = (text: string): string => text.toString().toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
export const generateUniqueSlug = async (model: mongoose.Model<any>, baseText: string, excludeId?: string): Promise<string> => {
  const baseSlug = generateSlug(baseText) || "item";
  let slug = baseSlug;
  let counter = 1;
  while (await model.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
};
