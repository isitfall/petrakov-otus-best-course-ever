import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
    title: string;
    description: string;
    videoUrl?: string;
    files?: string[];
    links?: string[];
    courseId: Schema.Types.ObjectId;
    comments: Schema.Types.ObjectId[];
    ratings: Schema.Types.ObjectId[];
    createdAt?: Date;
}

const LessonSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String },
    files: [{ type: String }],
    links: [{ type: String }],
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);