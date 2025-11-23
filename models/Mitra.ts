import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMitra extends Document {
  name: string;
  city: string;
  phone: string;
  address: string;
  email?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MitraSchema = new Schema<IMitra>(
  {
    name: {
      type: String,
      required: [true, "Nama mitra wajib diisi"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Kota wajib diisi"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Nomor telepon wajib diisi"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Alamat wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mitra: Model<IMitra> =
  mongoose.models.Mitra || mongoose.model<IMitra>("Mitra", MitraSchema);

export default Mitra;
