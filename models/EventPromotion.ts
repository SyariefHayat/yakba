import mongoose, { Model, Schema, Document } from "mongoose";

export type EventPromotionType = "event" | "promotion";

export interface IEventPromotion extends Document {
  title: string;
  slug: string;
  type: EventPromotionType;
  description: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  imageUrl?: string;
  link?: string;
  price?: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventPromotionSchema = new Schema<IEventPromotion>(
  {
    title: {
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
      enum: ["event", "promotion"],
      default: "event",
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    link: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EventPromotion: Model<IEventPromotion> =
  mongoose.models.EventPromotion ||
  mongoose.model<IEventPromotion>("EventPromotion", EventPromotionSchema);

export default EventPromotion;
