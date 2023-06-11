import {Request, Response, Router} from "express";
import {commentsService} from "../domain/comments-service";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {commentUpdateValidation} from "../validadation/comments-valodation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authMiddleware} from "../middlewares/auth-middleware";

export const commentRouter = Router({})

commentRouter.get('/:id',async (req: Request, res: Response) => {
    const comment = await commentsService.getCommentById(req.params.id)
    console.log(comment, "found by id comment")
    console.log(req.params.id, "id of comment to find")
    if (comment) {
        res.status(200).send(comment)
    } else {
        res.sendStatus(404)
    }

})

commentRouter.put('/:commentId',authMiddleware,
    commentUpdateValidation,inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const comment = await commentsService.updateCommentByID(
        req.params.commentId,
        req.body.content
    )
        console.log( req.params.commentId, "comment id in update")

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