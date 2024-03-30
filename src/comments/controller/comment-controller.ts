import {Request, Response} from "express";
import {commentService} from "../../composition-root";
import {CommentService} from "../service/comment-service";
import {Comment} from "../classes/comment-class";
export class CommentController {
    constructor(
        protected commentService: CommentService
    ) {}

    async getCommentById(req: Request, res: Response) {
        const comment: Comment | null = await this.commentService.findCommentById(req.params.id)

        if (comment) {
            res.status(200).send(comment)
        } else {
            res.sendStatus(404)
        }
    }
    async createComment(req: Request, res: Response) {
        const newComment: Comment | null = await this.commentService.createComment(
            req.body.content,
            req.params.movieId,
            req.userId!,
        )
        res.status(201).send(newComment)
    }
    async updateComment(req: Request, res: Response) {
        const commentUpdated: boolean = await this.commentService.updateComment(
            req.params.commentId,
            req.body.content
        )

        if (commentUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
    async deleteComment(req: Request, res: Response) {
        const commentDeleted: boolean = await this.commentService.deleteComment(req.params.id)

        if (commentDeleted) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

}