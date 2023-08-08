import {Request, Response, Router} from "express";
import {CommentsService} from "../domain/comments-service";
import {commentUpdateValidation} from "../validadation/comments-valodation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentsController} from "../composition-root";

export const commentRouter = Router({})

export class CommentsController {
        constructor(protected commentsService: CommentsService
        ) {}
    async getCoomentById(req: Request, res: Response) {
        const comment = await this.commentsService.getCommentById(req.params.id)

        if (comment) {
            res.status(200).send(comment)
        } else {
            res.sendStatus(404)
        }
    }
    async updateComment(req: Request, res: Response) {
        const commentBeforeUpdating = await this.commentsService.getCommentById(req.params.commentId)
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
        const commentBeforeDelete = await this.commentsService.getCommentById(req.params.commentId)
        if (!commentBeforeDelete) return res.sendStatus(404);
        const commentatorId = commentBeforeDelete.commentatorInfo.userId

        if (commentatorId !== req.userId) return res.sendStatus(403)
        const newComment = await this.commentsService.deleteComment(req.params.commentId)

        res.sendStatus(204)
    }
}

commentRouter.get('/:id',commentsController.getCoomentById.bind(commentsController))

commentRouter.put('/:commentId',authMiddleware,
    commentUpdateValidation,inputValidationMiddleware,
    commentsController.updateComment.bind(commentsController))

commentRouter.delete('/:commentId',authMiddleware,
    commentsController.deleteComment.bind(commentsController))