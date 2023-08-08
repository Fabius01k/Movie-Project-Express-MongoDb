import {Request, Response, Router} from "express";
import {postCreateValidators, postUpdateValodators} from "../validadation/post-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {PostsServise} from "../domain/posts-servise";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentCreateByPostValidation} from "../validadation/comments-valodation";
import {postsController} from "../composition-root";


export const postsRouter = Router({})

export class PostsController {
    constructor(
        protected postsServise: PostsServise
    ) {}
    async getAllPosts(req: Request, res: Response) {
        let sortBy: string = req.query.sortBy as any
        if (!sortBy) {
            sortBy = 'createdAt'
        }

        let sortDirection: 'asc' | 'desc' | undefined = req.query.sortDirection as 'asc' | 'desc' | undefined
        if (!sortDirection || sortDirection.toLowerCase() !== 'asc') {
            sortDirection = 'desc'
        }

        let pageSize: number = req.query.pageSize as any
        const checkPagSize = +pageSize

        if (!pageSize || !Number.isInteger(checkPagSize) || checkPagSize <= 0) {
            pageSize = 10
        }

        let pageNumber: number = req.query.pageNumber as any
        const checkPageNumber = +pageNumber

        if (!pageNumber || !Number.isInteger(checkPageNumber) || checkPageNumber <= 0) {
            pageNumber = 1
        }

        const posts = await this.postsServise.findPosts(sortBy, sortDirection, pageSize, pageNumber)
        res.status(200).send(posts)
    }
    async getPostById(req: Request, res: Response) {
        const post = await this.postsServise.getPostById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    }
    async getCommentByPostID(req: Request, res: Response) {
        let sortBy: string = req.query.sortBy as any
        if (!sortBy) {
            sortBy = 'createdAt'
        }

        let sortDirection: 'asc' | 'desc' | undefined = req.query.sortDirection as 'asc' | 'desc' | undefined
        if (!sortDirection || sortDirection.toLowerCase() !== 'asc') {
            sortDirection = 'desc'
        }

        let pageSize: number = req.query.pageSize as any
        const checkPagSize = +pageSize

        if (!pageSize || !Number.isInteger(checkPagSize) || checkPagSize <= 0) {
            pageSize = 10
        }

        let pageNumber: number = req.query.pageNumber as any
        const checkPageNumber = +pageNumber

        if (!pageNumber || !Number.isInteger(checkPageNumber) || checkPageNumber <= 0) {
            pageNumber = 1
        }

        const result = await this.postsServise.getPostById(req.params.postId)
        if (!result) {
            res.sendStatus(404);
            return
        }

        const post = await this.postsServise.findCommentByPostID(sortBy, sortDirection, pageSize, pageNumber, result!.id)
        res.status(200).send(post)
    }
    async createPost(req: Request, res: Response) {

        const newPost = await this.postsServise.createPost(
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.blogId
        )

        if (newPost) {
            res.status(201).send(newPost)

        } else {
            res.sendStatus(404)
        }
    }
    async createCommentByIdPost(req: Request, res: Response) {

        const newComment = await this.postsServise.createCommentByPostId(
            req.body.content,
            req.params.postId,
            req.userId!
        )

        if (newComment) {
            console.log("comment creation succeded")
            res.status(201).send(newComment)

        } else {
            console.log("comment creation failed")
            res.sendStatus(404)
        }
    }
    async updatePost(req: Request, res: Response) {

        const post = await this.postsServise.updatePost(
            req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.blogId)

        if (post) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
    async deletePost(req: Request, res: Response) {
        const newPosts = await this.postsServise.deletePost(req.params.id)

        if (newPosts) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}

postsRouter.get('/', postsController.getAllPosts.bind(postsController))

postsRouter.get('/:postId/comments', postsController.getCommentByPostID.bind(postsController))

postsRouter.get('/:id', postsController.getPostById.bind(postsController))

postsRouter.post('/', basicAuthGuardMiddleware, postCreateValidators, inputValidationMiddleware,
    postsController.createPost.bind(postsController))

postsRouter.post('/:postId/comments', authMiddleware, commentCreateByPostValidation,
    inputValidationMiddleware,
    postsController.createCommentByIdPost.bind(postsController))

postsRouter.put('/:id', basicAuthGuardMiddleware, postUpdateValodators, inputValidationMiddleware,
    postsController.updatePost.bind(postsController))

postsRouter.delete('/:id', basicAuthGuardMiddleware,
    postsController.deletePost.bind(postsController))





