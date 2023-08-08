import {TcommentView} from "../models/comments/comments-type";
import {CommentsRepository} from "../repositories-db/comments-repository-db";
import {ClassCommentDb} from "../classes/comments/comments-class";

export let comments: ClassCommentDb[] = []
export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository
    ) {}
    async getCommentById(id: string): Promise<TcommentView | null> {
        return this.commentsRepository.getCommentById(id)
    }
    async updateCommentByID(commentId: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateCommentByID(commentId, content)
    }
    async deleteComment(commentId: string): Promise<boolean> {
        return await this.commentsRepository.deleteComment(commentId)
    }
}

