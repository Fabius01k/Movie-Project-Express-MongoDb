import {CommentModel, MovieModel} from "../../db/db";
import {Comment} from "../classes/comment-class";

export class CommentRepository {

    async findCommentById(id: string): Promise<Comment | null> {
        const comment = await CommentModel.findOne({id: id})
        if(!comment) return null

        return (comment)
    }
    async createComment(newComment: Comment): Promise<Comment | null> {
        await CommentModel.insertMany([newComment]);
        return newComment
    }
    async updateComment(id: string, content: string): Promise<boolean> {
        const updateComment = await CommentModel
            .updateOne({id: id}, {
                $set: {
                    content: content
                },
            })

        return updateComment.matchedCount === 1
    }
    async deleteComment(id: string): Promise<boolean> {
        const deleteComment = await CommentModel
            .deleteOne({id: id})

        return deleteComment.deletedCount === 1
    }
}