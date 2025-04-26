import express from "express";
import { APP_PORT } from "./consts/app";
import { DatabaseClient } from "./db/client";
import { User } from "./db/models/user.models";
import { Difficulty, Roles } from "./types/db/common.types";
import { Course } from "./db/models/course.models";
import { Lesson } from "./db/models/lesson.models";
import { Tag } from "./db/models/tags.models";

export const app = express();

const dbClient = DatabaseClient.getInstance();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}`)
})

const createSomeDbItems = async () => {
    try {
        await dbClient.connect();

        const user = await User.create({
            username: 'Otus',
            password: '123456',
            email: 'otus@otus.com',
            role: Roles.Admin,
            createdAt: new Date(),
        })

        const beTag = await Tag.create({
            title: "backend",
        })

        const programmingTag = await Tag.create({
            title: "programming",
        })

        const course = await Course.create({
            title: 'Otus nodejs',
            description: 'Course description',
            difficulty: Difficulty.Beginner,
            authorId: user.id,
            tags: [programmingTag.id, beTag.id],
        })

        await Lesson.create({
            title: "FirstLesson",
            description: "First Lesson",
            courseId: course.id,
        })
    } catch (error) {
        console.log(error);
    }
}

createSomeDbItems();

