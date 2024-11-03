import mongoose, { Schema, Document, Model } from "mongoose";

interface MenuData extends Document {
  name: string;
  images: string;
  price: number;
  categoryId: mongoose.Types.ObjectId;
  status: "active" | "inactive";
}

const MenuSchema: Schema = new Schema({
  name: { type: String, required: true },
  images: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

const Menu: Model<MenuData> =
  mongoose.models.Menu || mongoose.model<MenuData>("Menu", MenuSchema);

export default Menu;
