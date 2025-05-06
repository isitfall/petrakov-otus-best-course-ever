import express from "express";
import { DatabaseClient } from "./db/client";
import { userRouter } from "./routes/user.routes";
import { courseRouter } from "./routes/courses.routes";
import { lessonRouter } from "./routes/lessons.routes";
import { tagsRouter } from "./routes/tags.routes";
import { ratingRouter } from "./routes/rating.routes";
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

// @ts-expect-error
const swaggerDoc = JSON.parse(fs.readFileSync(__dirname + "/swagger/swagger-output.json"));


export const main = async (dbUri: string)=> {
    const app = express();
    try {
        const dbClient =  DatabaseClient.getInstance();
        await dbClient.connect(dbUri);

        app.use(express.json());
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

        app.use(userRouter);
        app.use(courseRouter);
        app.use(lessonRouter);
        app.use(tagsRouter);
        app.use(ratingRouter);

        app.listen(3000, () => console.log("Server is running on port 3000"));
    } catch (e) {
        console.log(e);
    }
    return app;
}

