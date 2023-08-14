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

    async getCommentById(id: string, userId: string | null): Promise<TcommentView | null> {

        // const infoId = id
        // const sumOfLikes = await this.commentsRepository.countLikesOfComment(infoId)
        // const sumOfDislikes = await this.commentsRepository.countDislikesOfComment(infoId)
        //
        // await this.commentsRepository.changeNumberOfLikesAndDislikes(infoId, sumOfLikes, sumOfDislikes)

        return this.commentsRepository.getCommentById(id, userId)
    }

    async makeLikeDislikesInDb(userId: string, commentId: string,
                               likeStatus: string, dateOfLikeDislike: Date): Promise<boolean> {
        const oldLikeOrDislikeOfUser = await this.commentsRepository.findOldLikeOrDislike(commentId, userId)
        console.log('SERVICE:', oldLikeOrDislikeOfUser)
        if (oldLikeOrDislikeOfUser) {

            if (oldLikeOrDislikeOfUser.likeStatus === "Like") {
                const infoId = commentId//use commentId from function params
                await this.commentsRepository.deleteNumberOfLikes(infoId)

            } else if (oldLikeOrDislikeOfUser.likeStatus === "Dislike") {
                const infoId = commentId
                await this.commentsRepository.deleteNumberOfDislikes(infoId);
            }
            await this.commentsRepository.deleteOldLikeDislike(userId)
        }

        const userLikeStatus = likeStatus

        if (userLikeStatus === "Like") {
            const infoId = commentId
            await this.commentsRepository.updateNumberOfLikes(infoId)
        }
        if (userLikeStatus === "Dislike") {
            const infoId = commentId
            await this.commentsRepository.updateNumberOfDislikes(infoId)
        }

        let result = await this.commentsRepository.makeLikeOrDislike(userId, commentId, likeStatus, dateOfLikeDislike)
        return result
    }

    async updateCommentByID(commentId: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateCommentByID(commentId, content)
    }

    async deleteComment(commentId: string): Promise<boolean> {
        return await this.commentsRepository.deleteComment(commentId)
    }

    async findCommentFor(id: string):Promise< any | null> {
        return await this.commentsRepository.findCommentForDb(id)
    }
}



