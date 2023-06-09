import {ObjectId} from "mongodb";

export type TcommentDb = {
    _id: ObjectId
    id: string
    content: string
    commentatorInfo: {
        userId: string,
        userLogin: string
    }
    createdAt: string
}

export type TcommentView = {
    id: string
    content: string
    commentatorInfo: {
        userId: string,
        userLogin: string
    }
    createdAt: string
}

