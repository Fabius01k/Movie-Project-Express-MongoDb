import mongoose from "mongoose";
import {ObjectId, WithId} from "mongodb";
import {TBlogDb} from "../../models/blogs/blogs-type";


export const blogsSchema = new mongoose.Schema<WithId<TBlogDb>>({
    _id: { type: ObjectId, require: true},
    id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    websiteUrl: { type: String, require: true },
    createdAt: { type: String, require: true },
    isMembership: { type: Boolean, require: true }
})