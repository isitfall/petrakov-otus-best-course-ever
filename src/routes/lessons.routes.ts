import {Router} from "express";
import { Lesson } from "../db/models/lesson.models";


export const lessonRouter = Router();

lessonRouter.post("/api/lessons", async (req, res) => {
    if (!req.body) throw new Error("Lesson Data Not Found");
    try {
        const lesson  = await Lesson.create(req.body);
        res.status(201).json(lesson);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

lessonRouter.get("/api/lessons", async (req, res) => {
    try {
        const lessons = await Lesson.find();
        if (lessons.length) {
            res.status(200).json(lessons);
        } else {
            res.status(404).json({message: "Lessons not found"});
        }
    } catch (error) {
        res.status(404).json({message: "Lessons not found"});
    }
})

lessonRouter.get("/api/lessons/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Lesson.findOne({_id});
        if (!result) {
            res.status(404).json({message: "Lesson does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

lessonRouter.delete("/api/lessons/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Lesson.findOneAndDelete({_id});
        if (!result) {
            res.status(404).json({message: "Lesson does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

lessonRouter.put("/api/lessons/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const filter = {_id};
        const update = req.body;

        const result = await Lesson.findOneAndUpdate(filter, update);
        if (!result) {
            res.status(404).json({message: "Lesson does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})