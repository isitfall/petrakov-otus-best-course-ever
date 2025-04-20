import express from "express";
import { APP_PORT } from "./consts/app";

export const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}`)
})