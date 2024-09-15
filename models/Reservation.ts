import mongoose, { Schema, Document } from "mongoose";

interface MakeReservationData extends Document {
  email: string;
  firstName: string;
  lastName: string;
  noOfGuests: string | number;
  phoneNumber: string;
  reservationDate: string;
  reservationTime: string;
}

const ReservationSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  noOfGuests: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  reservationDate: { type: String, required: true },
  reservationTime: { type: String, required: true },
});

export default mongoose.models.Reservation ||
  mongoose.model<MakeReservationData>("Reservation", ReservationSchema);
