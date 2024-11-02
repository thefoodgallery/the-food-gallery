import mongoose, { Schema, Document } from "mongoose";

interface MenuData extends Document {
  name: string;
  images: { src: string; alt: string }[];
  price: number;
  categoryId: string;
}

const MenuSchema: Schema = new Schema({
  name: { type: String, required: true },
  images: [
    {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],
  price: { type: Number, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.models.Menu ||
  mongoose.model<MenuData>("Menu", MenuSchema);
