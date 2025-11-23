import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAboutPage extends Document {
  title: string;
  shortDescription: string;
  content: string;
  bannerUrl?: string;
  visi: string[];
  misi: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AboutPageSchema = new Schema<IAboutPage>(
  {
    title: {
      type: String,
      required: [true, "Judul halaman wajib diisi"],
      trim: true,
      maxlength: 150,
    },

    shortDescription: {
      type: String,
      required: [true, "Deskripsi singkat wajib diisi"],
      trim: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: [true, "Konten lengkap wajib diisi"],
    },

    bannerUrl: {
      type: String,
      default: null,
    },

    visi: {
      type: [String],
      default: [],
    },

    misi: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const AboutPage: Model<IAboutPage> =
  mongoose.models.AboutPage ||
  mongoose.model<IAboutPage>("AboutPage", AboutPageSchema);

export default AboutPage;
