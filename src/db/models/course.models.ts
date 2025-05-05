import mongoose, { Schema, Document } from 'mongoose';
import { Difficulty } from '../../types/db/common.types';


export interface ICourse extends Document {
    title: string;
    description: string;
    tags?: string[];
    difficulty: Difficulty;
    authorId: Schema.Types.ObjectId;
    files?: string[];
    usersId: Schema.Types.ObjectId[];
    createdAt?: Date;
}

const CourseSchema: Schema = new Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', default: () => [] }],
    difficulty: { type: String, trim: true, enum: [Difficulty.Beginner, Difficulty.Intermediate, Difficulty.Advanced], required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    files: [{ type: String, trim: true, default: () => [] }],
    usersId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

export const Course = mongoose.model<ICourse>('Course', CourseSchema);