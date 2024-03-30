import mongoose from "mongoose";
import {Comment} from "../classes/comment-class";

export const commentSchema = new mongoose.Schema<Comment>({
    id: { type: String, required: true },
    content: { type: String, required: true },
    commentatorInfo: {
        userId: { type: String, required: true },
        userLogin: { type: String, required: true }
    },
    createdAt: { type: String, required: true },
    movieId: { type: String, required: true }
})