import mongoose, { Schema, Model, Types } from "mongoose";

export interface IJob {
    _id?: Types.ObjectId;
    title: string;
    slug: string;
    location: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    description: string;
    requirements?: string;
    responsibilities?: string;
    qualifications?: string;
    salary?: {
        min?: number;
        max?: number;
        currency?: string;
    };
    status: "active" | "closed" | "draft";
    postedDate: Date;
    closingDate?: Date;
    contactEmail?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const JobSchema = new Schema<IJob>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        location: { type: String, required: true },
        type: {
            type: String,
            enum: ["full-time", "part-time", "contract", "internship"],
            required: true,
        },
        description: { type: String, required: true },
        requirements: { type: String },
        responsibilities: { type: String },
        qualifications: { type: String },
        salary: {
            min: { type: Number },
            max: { type: Number },
            currency: { type: String, default: "IDR" },
        },
        status: {
            type: String,
            enum: ["active", "closed", "draft"],
            default: "draft",
        },
        postedDate: { type: Date, required: true, default: Date.now },
        closingDate: { type: Date },
        contactEmail: { type: String },
    },
    { timestamps: true }
);

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

export default Job;
