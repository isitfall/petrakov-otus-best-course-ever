import mongoose, { Schema, Document } from 'mongoose';
import { Roles } from "../../types/db/common.types";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: Roles;
    createdAt?: Date;
}

const UserSchema: Schema = new Schema({
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    role: { type: String, trim: true, enum: [Roles.User, Roles.Author, Roles.Admin], default: Roles.User },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);