import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    title: string;
    createdAt?: Date;
}

const TagSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

export const Tag = mongoose.model<ITag>('Tag', TagSchema);