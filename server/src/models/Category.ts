import mongoose, { Schema, Types } from "mongoose";
import { generateUniqueSlug } from "../utils/generateSlug";
export interface ICategory extends mongoose.Document { _id: Types.ObjectId; name: string; slug: string; description?: string; imageUrl?: string; imagePublicId?: string; isActive: boolean; }
const categorySchema = new Schema<ICategory>({ name: { type: String, required: true, trim: true, unique: true }, slug: { type: String, unique: true }, description: { type: String, default: "" }, imageUrl: { type: String, default: "" }, imagePublicId: { type: String, default: "" }, isActive: { type: Boolean, default: true } }, { timestamps: true });
(categorySchema as any).pre("save", async function (this: any, next: mongoose.CallbackWithoutResultAndOptionalError) {
  if (this.isModified("name")) {
    this.slug = await generateUniqueSlug(this.constructor as mongoose.Model<any>, this.name, String(this._id));
  }
  next();
});
export default mongoose.model<ICategory>("Category", categorySchema);
