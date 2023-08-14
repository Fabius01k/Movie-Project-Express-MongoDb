import {TcommentView} from "../models/comments/comments-type";
import {CommentsRepository} from "../repositories-db/comments-repository-db";
import {ClassCommentDb} from "../classes/comments/comments-class";
import {userModel} from "../db/db";
import {TUserView} from "../models/users/users-type";

export enum LikeStatus{
    like= 'Like',
    dislike = 'Dislike',
    none = 'None'
}

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
                               likeStatus:LikeStatus, dateOfLikeDislike: Date): Promise<boolean> {
        const oldLikeOrDislikeOfUser = await this.commentsRepository.findOldLikeOrDislike(commentId, userId)
        console.log('SERVICE:', oldLikeOrDislikeOfUser)
        if (oldLikeOrDislikeOfUser) {

            if (oldLikeOrDislikeOfUser.likeStatus === LikeStatus.like) {
                const infoId = commentId//use commentId from function params
                await this.commentsRepository.deleteNumberOfLikes(infoId)

            } else if (oldLikeOrDislikeOfUser.likeStatus === LikeStatus.dislike) {
                const infoId = commentId
                await this.commentsRepository.deleteNumberOfDislikes(infoId);
            }
            await this.commentsRepository.deleteOldLikeDislike(commentId, userId)
        }

        const userLikeStatus = likeStatus;

        const likeInfo = {
            userId: userId,
            likeStatus: likeStatus,
            dateOfLikeDislike: dateOfLikeDislike
        }

        if (userLikeStatus === "Like") return this.commentsRepository.updateNumberOfLikes(commentId, likeInfo);

        if (userLikeStatus === "Dislike")return this.commentsRepository.updateNumberOfDislikes(commentId, likeInfo);
       return true;

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



