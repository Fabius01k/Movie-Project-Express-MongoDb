import mongoose from "mongoose";
import {ObjectId, WithId} from "mongodb";

import {ClassCommentDb} from "../../classes/comments/comments-class";


export const commentSchema = new mongoose.Schema<WithId<ClassCommentDb>>({
    _id: { type: ObjectId, require: true},
    id: { type: String, require: true },
    content: { type: String, require: true },
    commentatorInfo: {
        userId: { type: String, require: true },
        userLogin: { type: String, require: true },
    },
    createdAt: { type: String, require: true },
    postId: { type: String, require: true },
});