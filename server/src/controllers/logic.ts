import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel, contentModel, linkModel } from '../model/userdb.js';
import { JWT_SECRET } from "../config.js";
import { userSignupSchema, userSigninSchema } from "../schema/user.js";

export const userSignup = async (req: Request, res: Response) => {
    try {
        const parsed = userSignupSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ message: "Invalid data" });

        const { username, email, password } = parsed.data;

        const hashed = await bcrypt.hash(password, 10);
        await userModel.create({ username, email, password: hashed });

        res.json({ message: "user successfully created" });
    } catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
};

export const userSignin = async (req: Request, res: Response) => {
    try {
        const parsed = userSigninSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ message: "Invalid try again" });

        const { email, password } = parsed.data;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) return res.status(401).json({ message: "Invalid credentials" });
        //@ts-ignore
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
};

export const addContent = async (req: Request, res: Response) => {
    try {
    const { link, type , description, title }= req.body;
  
      const content = await contentModel.create({
        title,
        link,
        type,
        description,
        // @ts-ignore
        userId: req.userId,//for this user we create content
        tags: [],
      });
  
      res.json({ message: "Content Added" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};
  
export const findContent = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = await contentModel
            .find({ userId })
            .populate("userId", "username");
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const { contentId } = req.body;
        //@ts-ignore
        const userId = req.userId;

        await contentModel.deleteOne({ _id: contentId, userId });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
};
// {
//     "contentId":"69244fc3xxxxx"   this will come from delete below the map which will fetch excat content id from the map and delete it
// }

export const shareBrain = async (req: Request, res: Response) => {
    try {
        const { share } = req.body;
        // api testing { "share": "true"} we'll add button
        //@ts-ignore
        const userId = req.userId;

        if (share) {
            const existing = await linkModel.findOne({ userId });
            if (existing) return res.json({ hash: existing.hash });

            const hash = Math.random().toString(36).substring(2, 12);
            await linkModel.create({ userId, hash });

            return res.json({ hash });
        }

        await linkModel.deleteOne({ userId });
        res.json({ message: "Removed link" });
    } catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
};

export const getsharelink = async (req: Request, res: Response) => {
    try {
        const hash = req.params.shareLink;
        if (!hash) return res.status(400).json({ message: "Share link is required" });

        const link = await linkModel.findOne({ hash });
        if (!link) return res.status(404).json({ message: "Invalid share link" });

        const content = await contentModel.find({ userId: link.userId });
        const user = await userModel.findById(link.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ username: user.username, content });
    } catch (err) {
        res.status(500).json({ message: "Internal error" });
    }
};
