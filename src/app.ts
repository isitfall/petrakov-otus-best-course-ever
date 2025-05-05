import express from "express";
import { DatabaseClient } from "./db/client";
import { userRouter } from "./routes/user.routes";
import { courseRouter } from "./routes/courses.routes";


export const main = async ()=> {
    try {
        const dbClient =  DatabaseClient.getInstance();
        await dbClient.connect();

        const app = express();
        app.use(express.json());
        app.use(userRouter);
        app.use(courseRouter);


        app.listen(3000, () => console.log("Server is running on port 3000"));
    } catch (e) {
        console.log(e);
    }

}

