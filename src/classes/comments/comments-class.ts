import {ObjectId} from "mongodb";


export class ClassCommentDb {
    constructor(
    public _id: ObjectId,
    public id: string,
    public content: string,
    public commentatorInfo: {
        userId: string,
        userLogin: string
    },
    public createdAt: string,
    public postId : string
) {}
}