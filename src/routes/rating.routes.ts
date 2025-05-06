import {Router} from "express";
import { Rating } from "../db/models/rating.models";


export const ratingRouter = Router();

ratingRouter.post("/api/ratings", async (req, res) => {
    if (!req.body) throw new Error("Rating Data Not Found");
    try {
        const rating  = await Rating.create(req.body);
        res.status(201).json(rating);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

ratingRouter.get("/api/ratings", async (req, res) => {
    try {
        const ratings = await Rating.find();
        if (ratings.length) {
            res.status(200).json(ratings);
        } else {
            res.status(404).json({message: "Ratings not found"});
        }
    } catch (error) {
        res.status(404).json({message: "Ratings not found"});
    }
})

ratingRouter.get("/api/ratings/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Rating.findOne({_id});
        if (!result) {
            res.status(404).json({message: "Rating does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

ratingRouter.delete("/api/ratings/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await Rating.findOneAndDelete({_id});
        if (!result) {
            res.status(404).json({message: "Rating does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

ratingRouter.put("/api/ratings/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const filter = {_id};
        const update = req.body;

        const result = await Rating.findOneAndUpdate(filter, update);
        if (!result) {
            res.status(404).json({message: "Rating does not exist"});
        }
        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})