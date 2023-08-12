import {CommentsService} from "../../domain/comments-service";
import {Request, Response} from "express";
import {jwtService} from "../../application/jwt-service";

export class CommentsController {
    constructor(protected commentsService: CommentsService
    ) {}
    async getCoomentById(req: Request, res: Response) {
        const token = req.cookies.accessToken
        const userId =  await jwtService.getUserIdByToken(token)
        const comment = await this.commentsService.getCommentById(req.params.id,userId)

        if (comment) {
            res.status(200).send(comment)
        } else {
            res.sendStatus(404)
        }
    }
    async makeLikeDislikes(req: Request, res: Response) {
        const token = req.cookies.accessToken
        const userId =  await jwtService.getUserIdByToken(token)
        const comment = await this.commentsService.getCommentById(req.params.commentId,userId)
        if (!comment) return res.sendStatus(404)

        const commentId = req.params.commentId
        const likeStatus = req.body
        const dateOfLikeDislike = new Date

        await this.commentsService.makeLikeDislikesInDb(userId,commentId,likeStatus,dateOfLikeDislike)
    }
    async updateComment(req: Request, res: Response) {
        const token = req.cookies.accessToken
        const userId =  await jwtService.getUserIdByToken(token)
        const commentBeforeUpdating = await this.commentsService.getCommentById(req.params.commentId,userId)
        if (!commentBeforeUpdating) return res.sendStatus(404);
        const commentatorId = commentBeforeUpdating.commentatorInfo.userId
        if (commentatorId !== req.userId) return res.sendStatus(403)

        const comment = await this.commentsService.updateCommentByID(
            req.params.commentId,
            req.body.content
        )

        res.sendStatus(204)
    }
    async deleteComment(req: Request, res: Response) {
        const token = req.cookies.accessToken
        const userId =  await jwtService.getUserIdByToken(token)
        const commentBeforeDelete = await this.commentsService.getCommentById(req.params.commentId,userId)
        if (!commentBeforeDelete) return res.sendStatus(404);
        const commentatorId = commentBeforeDelete.commentatorInfo.userId

        if (commentatorId !== req.userId) return res.sendStatus(403)
        const newComment = await this.commentsService.deleteComment(req.params.commentId)

        res.sendStatus(204)
    }
}