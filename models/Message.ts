import mongoose, { Schema, Model, Types } from "mongoose";

export interface IMessage {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "unread" | "read" | "replied";
    createdAt?: Date;
    updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["unread", "read", "replied"],
            default: "unread",
        },
    },
    { timestamps: true }
);

const Message: Model<IMessage> =
    mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
