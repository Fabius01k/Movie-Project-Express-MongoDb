import {TcommentDb, TcommentView} from "../models/comments/comments-type";
import {CommentsRepository} from "../repositories-db/comments-repository-db";

export let comments: TcommentDb[] = []

export const commentsService = {

    async getCommentById(id: string): Promise<TcommentView | null> {
        return CommentsRepository.getCommentById(id)
    },

    async updateCommentByID(commentId: string, content: string): Promise<boolean> {
        return await CommentsRepository.updateCommentByID(commentId, content)
    },

    async deleteComment(commentId: string): Promise<boolean> {
        return await CommentsRepository.deleteComment(commentId)

    },
}
