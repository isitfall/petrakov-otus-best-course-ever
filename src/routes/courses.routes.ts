import {Router} from "express";
import {Course} from "../db/models/course.models";

export const courseRouter = Router();

courseRouter.post("/api/courses", async (req, res) => {
    if (!req.body) throw new Error("Course Data Not Found");
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

courseRouter.get("/api/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        if (courses.length) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({message: "Courses not found"});
        }
    } catch (error) {
        res.status(404).json({message: "Courses not found"});
    }
})

courseRouter.get("/api/courses/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Course.findOne({_id});
        if (!result) {
            res.status(404).json({message: "Course does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

courseRouter.delete("/api/courses/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Course.findOneAndDelete({_id});
        if (!result) {
            res.status(404).json({message: "Course does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

courseRouter.put("/api/courses/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const filter = {_id};
        const update = req.body;

        const result = await Course.findOneAndUpdate(filter, update);
        if (!result) {
            res.status(404).json({message: "Course does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})