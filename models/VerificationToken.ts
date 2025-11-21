import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVerificationToken extends Document {
  identifier: string;
  token: string;
  expires: Date;
  createdAt: Date;
}

const VerificationTokenSchema = new Schema<IVerificationToken>(
  {
    identifier: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

VerificationTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const VerificationToken: Model<IVerificationToken> =
  mongoose.models.VerificationToken ||
  mongoose.model<IVerificationToken>(
    "VerificationToken",
    VerificationTokenSchema
  );

export default VerificationToken;
