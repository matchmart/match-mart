import mongoose, { Schema, Types } from "mongoose";
import { generateUniqueSlug } from "../utils/generateSlug";
export interface IProductImage { url: string; publicId: string; }
export type ProductStatus = "active" | "inactive";
export interface IProduct extends mongoose.Document { _id: Types.ObjectId; name: string; slug: string; description?: string; price: number; discountPrice?: number; category: Types.ObjectId; stock: number; sizes: string[]; colors: string[]; images: IProductImage[]; isFeatured: boolean; isNewArrival: boolean; status: ProductStatus; }
const imageSchema = new Schema<IProductImage>({ url: { type: String, required: true }, publicId: { type: String, required: true } }, { _id: false });
const productSchema = new Schema<IProduct>({ name: { type: String, required: true, trim: true }, slug: { type: String, unique: true }, description: { type: String, default: "" }, price: { type: Number, required: true, min: 0 }, discountPrice: { type: Number, min: 0 }, category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, stock: { type: Number, default: 0, min: 0 }, sizes: { type: [String], default: [] }, colors: { type: [String], default: [] }, images: { type: [imageSchema], default: [] }, isFeatured: { type: Boolean, default: false }, isNewArrival: { type: Boolean, default: false }, status: { type: String, enum: ["active", "inactive"], default: "active" } }, { timestamps: true });
(productSchema as any).pre("save", async function (this: any, next: mongoose.CallbackWithoutResultAndOptionalError) {
  if (this.isModified("name")) {
    this.slug = await generateUniqueSlug(this.constructor as mongoose.Model<any>, this.name, String(this._id));
  }
  next();
});
export default mongoose.model<IProduct>("Product", productSchema);
