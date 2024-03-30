import {Router} from "express";
import {commentController} from "../../composition-root";

export const commentRouter = Router({})

commentRouter.get('/:id',commentController.getCommentById.bind(commentController))


commentRouter.post('/create-comment',
    commentController.createComment.bind(commentController))


commentRouter.put('/update-comment',
    commentController.updateComment.bind(commentController))


commentRouter.delete('/delete-comment',
    commentController.deleteComment.bind(commentController))