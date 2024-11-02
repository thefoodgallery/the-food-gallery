import mongoose, { Schema, Document } from "mongoose";

interface CategoryData extends Document {
  name: string;
  status: "active" | "inactive";
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.models.Category ||
  mongoose.model<CategoryData>("Category", CategorySchema);
