import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "mongoose";

// Define an interface for the Order document
interface IOrder extends Document {
  customer: ObjectId; // Reference to User
  items: string;
  totalAmount: number;
  orderDate: Date;
  onlinePaid: boolean;
  paymentData: string;
}

// Create a Mongoose schema for the Order
const OrderSchema: Schema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    items: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    onlinePaid: { type: Boolean, default: false },
    paymentData: { type: String, default: null },
  },
  { strict: false }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
