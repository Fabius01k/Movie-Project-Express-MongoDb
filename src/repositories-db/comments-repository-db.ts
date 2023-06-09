import {TcommentDb, TcommentView} from "../models/comments/comments-type";
import {commentsCollection} from "../db/db";

export let comments: TcommentDb[] = []
const mapCommentFromDbToView = (comment: TcommentDb): TcommentView => {
    return {
        id: comment.id,
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt
    }
}

export const CommentsRepository = {

    async getCommentById(id: string): Promise<TcommentView | null> {
        const comment: TcommentDb | null = await commentsCollection.findOne({id: id})
        if (!comment) return null

        return mapCommentFromDbToView(comment)

    },

    async createCommentByPostId(newComment: TcommentDb): Promise<TcommentView | null> {

        await commentsCollection.insertOne(newComment)

        return mapCommentFromDbToView(newComment)
    },

    async findCommentByPostID(sortBy: string,sortDirection: 'asc' | 'desc',
                              pageSize: number,pageNumber: number,postId: string) {

        const comment: TcommentDb[] = await commentsCollection
            .find({postId: postId})
            .sort(sortBy,sortDirection)
            .skip((pageNumber-1)*pageSize)
            .limit(+pageSize)
            .toArray()

        const items = comment.map(c => mapCommentFromDbToView(c))
        const totalCount = await commentsCollection.countDocuments({postId: postId})

        return {
            pagesCount: Math.ceil(totalCount/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }
        },



    async updateCommentByID(commentId: string, content: string): Promise<boolean> {
        const updateCommentByID = await commentsCollection
            .updateOne({id: commentId}, {
                $set: {
                    content: content
                },
            })

        const comment = updateCommentByID.matchedCount === 1
        return comment
    },

    async deleteComment(commentId: string): Promise<boolean> {
        const deleteComment = await commentsCollection
            .deleteOne({id: commentId})

        return deleteComment.deletedCount === 1
    },
}
