import mongoose from "mongoose";
import {WatchList} from "../classes/watch-list-class";

export const WatchListSchema = new mongoose.Schema<WatchList>({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    movieId: { type: [String], default: [] },
})