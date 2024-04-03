import mongoose from "mongoose";
import {UserReaction} from "../classes/user-reaction-class";

export const UserReactionSchema = new mongoose.Schema<UserReaction>({
    id: { type: String, required: true },
    movieId: { type: String, required: true },
    userLogin: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    reactionStatus: { type: String, required: true }
})