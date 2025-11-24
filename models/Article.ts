import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  contentHtml: string;
  thumbnailUrl?: string;
  tags: string[];
  author?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "Judul artikel wajib diisi"],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: [true, "Slug wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    contentHtml: {
      type: String,
      required: [true, "Konten artikel wajib diisi"],
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
