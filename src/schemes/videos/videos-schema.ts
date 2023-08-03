import mongoose from "mongoose";
import {TVideoDb} from "../../models/videos/videos-type";
import {ObjectId, WithId} from "mongodb";


export const videosSchema = new mongoose.Schema<WithId<TVideoDb>>({
    _id: { type: ObjectId, require: true},
    id: { type: Number, require: true },
    title: { type: String, require: true },
    author: { type: String, require: true },
    canBeDownloaded: { type: Boolean, require: true },
    minAgeRestriction:  { type: Number, default: null },
    createdAt: { type: String, require: true },
    publicationDate: { type: String, require: true },
    availableResolutions: { type: [String], required: true },
})

