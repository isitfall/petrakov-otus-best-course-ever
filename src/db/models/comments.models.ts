import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    text: string;
    userId: Schema.Types.ObjectId;
    lessonId: Schema.Types.ObjectId;
    createdAt?: Date;
}

const CommentSchema: Schema = new Schema({
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    createdAt: { type: Date, default: () => Date.now() },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);