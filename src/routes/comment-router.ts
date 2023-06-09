import {Request, Response, Router} from "express";
import {commentsService} from "../domain/comments-service";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {commentUpdateValidation} from "../validadation/comments-valodation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";

export const commentRouter = Router({})

commentRouter.get('/:id',async (req: Request, res: Response) => {
    const comment = await commentsService.getCommentById(req.params.id)
    if (comment) {
        res.status(200).send(comment)
    } else {
        res.sendStatus(404)
    }

})

commentRouter.put('/:commentId ',authMiddleware,
    commentUpdateValidation,inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const comment = await commentsService.updateCommentByID(
        req.params.commentId,
        req.body.content
    )

        if(comment) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

})

commentRouter.delete('/:commentId',authMiddleware,
    async (req: Request, res: Response) => {

    const newComment = await commentsService.deleteComment(req.params.commentId)

        if (newComment) {
            res.sendStatus(204)
        } else {

            res.sendStatus(404)
        }

})