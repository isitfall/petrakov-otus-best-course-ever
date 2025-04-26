import mongoose, { Schema, Document } from 'mongoose';

enum Ratings {
    One = 1, Two, Three, Four = 4, Five = 5
}

export interface IRating extends Document {
    value: Ratings;
    userId: Schema.Types.ObjectId;
    lessonId: Schema.Types.ObjectId;
    createdAt?: Date;
}

const RatingSchema: Schema = new Schema({
    value: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    createdAt: { type: Date, default: () => Date.now() },
});

export const Rating = mongoose.model<IRating>('Rating', RatingSchema);