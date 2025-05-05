import {Router} from "express";
import { Tag } from "../db/models/tags.models";


export const tagsRouter = Router();

tagsRouter.post("/api/tags", async (req, res) => {
    if (!req.body) throw new Error("Tag Data Not Found");
    try {
        const tag  = await Tag.create(req.body);
        res.status(201).json({tag});
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

tagsRouter.get("/api/tags", async (req, res) => {
    try {
        const tags = await Tag.find();
        if (tags.length) {
            res.status(200).json(tags);
        } else {
            res.status(404).json({message: "Tags not found"});
        }
    } catch (error) {
        res.status(404).json({message: "Tags not found"});
    }
})

tagsRouter.get("/api/tags/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Tag.findOne({_id});
        if (!result) {
            res.status(404).json({message: "Tag does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

tagsRouter.delete("/api/tags/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Tag.findOneAndDelete({_id});
        if (!result) {
            res.status(404).json({message: "Tag does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

tagsRouter.put("/api/tags/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const filter = {_id};
        const update = req.body;

        const result = await Tag.findOneAndUpdate(filter, update);
        if (!result) {
            res.status(404).json({message: "Tag does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})