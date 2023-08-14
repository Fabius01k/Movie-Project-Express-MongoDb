import {ObjectId} from "mongodb";
import {Schema} from "mongoose";


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
    public postId : string,
) {}
}

export interface LikesInfo {
    userId: string;
    likeStatus: string;
    dateOfLikeDislike: Date;
}
export class ClassCommentsLikesInfoDb {
    constructor(
    public infoId: string,
    public likesInfo: LikesInfo[] | null,
    public numberOfLikes: number,
    public numberOfDislikes: number
    ) {}
}

