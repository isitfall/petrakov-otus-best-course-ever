import {Router} from "express";
import { User } from "../db/models/user.models";

export const userRouter = Router();

userRouter.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        if (users?.length) {
            res.status(200).json(users);
        } else {
            res.status(404).json({message: "Users Not Found"});
        }
    } catch (error) {
        res.status(404).json({message: "Users Not Found"});
    }
});

userRouter.post("/api/users", async (req, res) => {
    if (!req.body) throw new Error("User Data Not Found");
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

userRouter.delete("/api/users/:id", async (req, res) => {
    const _id = req.params.id;
    if (!_id) throw new Error("Parameter 'id' is required");
    try {
        const result = await User.findOneAndDelete({_id});

        if (!result) {
            res.status(404).json({message: "User does not exist"});
        }

        res.status(200).json(result);
    } catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})

userRouter.put("/api/users/:id/role", async (req, res) => {
    if (!req.body?.role) throw new Error("Parameter 'role' is required");
    if (!req.params?.id) throw new Error("Parameter 'id' is required");
    try {
        const filter = {_id: req.params.id};
        const update = {role: req.body.role}
        const result = await User.findOneAndUpdate(filter, update);

        if (!result) {
            res.status(404).json({message: "User does not exist"});
        }

        res.status(201).json({result});
    }  catch (error) {
        // @ts-expect-error wrong type
        res.status(400).json({message: error?.errorResponse?.errmsg});
    }
})