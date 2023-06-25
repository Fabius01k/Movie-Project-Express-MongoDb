import {Request, Response, Router} from "express";
// import {postsRepository} from "../repositories-in-memory/posts-repository";
import {body, validationResult} from "express-validator";

import {blogs} from "../repositories-in-memory/blogs-repository";
import {postCreateValidators, postUpdateValodators} from "../validadation/post-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {postsRepository} from "../repositories-db/post-repostory-db";
import {postsServise} from "../domain/posts-servise";
import {authMiddleware} from "../middlewares/auth-middleware";
import {commentCreateByPostValidation} from "../validadation/comments-valodation";
import {commentsService} from "../domain/comments-service";

export const postsRouter = Router({})
postsRouter.get('/', async (req: Request, res: Response) => {
    let sortBy: string = req.query.sortBy as any
    if(!sortBy) {
        sortBy = 'createdAt'
    }

    //let sortDirection: 'asc' | 'desc' = req.query.sortDirection as any
    let sortDirection: 'asc' | 'desc' | undefined = req.query.sortDirection as 'asc' | 'desc' | undefined
    if(!sortDirection || sortDirection.toLowerCase() !== 'asc') {
        sortDirection = 'desc'
    }

    let pageSize: number = req.query.pageSize as any
    const checkPagSize = +pageSize

    if(!pageSize || !Number.isInteger(checkPagSize) || checkPagSize <= 0) {
        pageSize = 10
    }

    let pageNumber: number = req.query.pageNumber as any
    const checkPageNumber = +pageNumber

    if (!pageNumber || !Number.isInteger(checkPageNumber) || checkPageNumber <= 0 ) {
        pageNumber = 1
    }

    const posts = await postsServise.findPosts(sortBy,sortDirection,pageSize,pageNumber)
    res.status(200).send(posts)

})

postsRouter.get('/:postId/comments', async (req: Request, res: Response) => {
    let sortBy: string = req.query.sortBy as any
    if(!sortBy) {
        sortBy = 'createdAt'
    }

    //let sortDirection: 'asc' | 'desc' = req.query.sortDirection as any
    let sortDirection: 'asc' | 'desc' | undefined = req.query.sortDirection as 'asc' | 'desc' | undefined
    if(!sortDirection || sortDirection.toLowerCase() !== 'asc') {
        sortDirection = 'desc'
    }

    let pageSize: number = req.query.pageSize as any
    const checkPagSize = +pageSize

    if(!pageSize || !Number.isInteger(checkPagSize) || checkPagSize <= 0) {
        pageSize = 10
    }

    let pageNumber: number = req.query.pageNumber as any
    const checkPageNumber = +pageNumber

    if (!pageNumber || !Number.isInteger(checkPageNumber) || checkPageNumber <= 0 ) {
        pageNumber = 1
    }

    const result = await postsServise.getPostById(req.params.postId)
    if (!result) {
        res.sendStatus(404);
        return
    }

    const post = await postsServise.findCommentByPostID(sortBy,sortDirection,pageSize,pageNumber,result!.id)
    res.status(200).send(post)


})


postsRouter.post('/', basicAuthGuardMiddleware, postCreateValidators, inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const newPost = await postsServise.createPost(
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
})

postsRouter.post('/:postId/comments', authMiddleware, commentCreateByPostValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {


        const newComment = await postsServise.createCommentByPostId(
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

    })


postsRouter.get('/:id', async (req: Request, res: Response) => {
        const post = await postsServise.getPostById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id', basicAuthGuardMiddleware, postUpdateValodators, inputValidationMiddleware,
    async (req: Request, res: Response) => {


        const post = await postsServise.updatePost(
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
    })


postsRouter.delete('/:id', basicAuthGuardMiddleware,
    async (req: Request, res: Response) => {
        const newPosts = await postsServise.deletePost(req.params.id)

        if (newPosts) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })





