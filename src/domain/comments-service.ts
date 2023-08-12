import {TcommentView} from "../models/comments/comments-type";
import {CommentsRepository} from "../repositories-db/comments-repository-db";
import {ClassCommentDb} from "../classes/comments/comments-class";
import {userModel} from "../db/db";
import {TUserView} from "../models/users/users-type";

export let comments: ClassCommentDb[] = []
export class CommentsService {
    constructor(protected commentsRepository: CommentsRepository
    ) {
    }

    async getCommentById(id: string, userId: string): Promise<TcommentView | null> {

        const infoId = id
        const sumOfLikes = await this.commentsRepository.countLikesOfComment(infoId)
        const sumOfDislikes = await this.commentsRepository.countDislikesOfComment(infoId)

        await this.commentsRepository.changeNumberOfLikesAndDislikes(infoId, sumOfLikes, sumOfDislikes)

        return this.commentsRepository.getCommentById(id, userId)
    }

    async makeLikeDislikesInDb(userId: string, commentId: string,
                               likeStatus: string, dateOfLikeDislike: Date): Promise<boolean> {
        const oldLikeOrDislikeOfUser = await this.commentsRepository.findOldLikeOrDislike(userId)

        if (oldLikeOrDislikeOfUser) await this.commentsRepository.deleteOldLikeDislike(userId)

        let result = await this.commentsRepository.makeLikeOrDislike(userId, commentId, likeStatus, dateOfLikeDislike)
        return result
    }

    async updateCommentByID(commentId: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateCommentByID(commentId, content)
    }

    async deleteComment(commentId: string): Promise<boolean> {
        return await this.commentsRepository.deleteComment(commentId)
    }

    async findCommentFor(commentId: string):Promise< any | null> {
        return await this.commentsRepository.findCommentForDb(commentId)
    }
}



