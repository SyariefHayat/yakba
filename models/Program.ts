import mongoose, { Model, Schema } from "mongoose";

export type ProgramType = "online" | "offline" | "hybrid";

export interface IProgram extends Document {
  name: string;
  slug: string;
  type: ProgramType;
  level?: string;
  ageMin?: number;
  ageMax?: number;
  description: string;
  price?: number;
  discountPrice?: number;
  billingPeriod?: "once" | "monthly" | "yearly";
  isActive: boolean;
  thumbnailUrl?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "offline",
    },
    level: {
      type: String,
      trim: true,
    },
    ageMin: Number,
    ageMax: Number,
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    discountPrice: Number,
    billingPeriod: {
      type: String,
      enum: ["once", "monthly", "yearly"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    thumbnailUrl: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Program: Model<IProgram> =
  mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);

export default Program;
