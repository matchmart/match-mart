import mongoose, { Schema, Types } from "mongoose";
import { generateUniqueSlug } from "../utils/generateSlug";
export interface IBranchImage { url: string; publicId: string; }
export interface IBranch extends mongoose.Document { _id: Types.ObjectId; name: string; slug: string; locationName: string; address: string; phone?: string; whatsapp?: string; openingHours?: string; googleMapEmbedUrl?: string; images: IBranchImage[]; isFeatured: boolean; isActive: boolean; }
const imageSchema = new Schema<IBranchImage>({ url: { type: String, required: true }, publicId: { type: String, required: true } }, { _id: false });
const branchSchema = new Schema<IBranch>({ name: { type: String, required: true, trim: true }, slug: { type: String, unique: true }, locationName: { type: String, required: true, trim: true }, address: { type: String, required: true }, phone: { type: String, default: "" }, whatsapp: { type: String, default: "" }, openingHours: { type: String, default: "" }, googleMapEmbedUrl: { type: String, default: "" }, images: { type: [imageSchema], default: [] }, isFeatured: { type: Boolean, default: false }, isActive: { type: Boolean, default: true } }, { timestamps: true });
(branchSchema as any).pre("save", async function (this: any, next: mongoose.CallbackWithoutResultAndOptionalError) {
  if (this.isModified("name") || this.isModified("locationName")) {
    this.slug = await generateUniqueSlug(this.constructor as mongoose.Model<any>, `${this.name}-${this.locationName}`, String(this._id));
  }
  next();
});
export default mongoose.model<IBranch>("Branch", branchSchema);
