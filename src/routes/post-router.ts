import {Request, Response, Router} from "express";
// import {postsRepository} from "../repositories-in-memory/posts-repository";
import {body, validationResult} from "express-validator";

import {blogs} from "../repositories-in-memory/blogs-repository";
import {postCreateValidators, postUpdateValodators} from "../validadation/post-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../validadation/input-validation-middleware";
import {postsRepository} from "../repositories-db/post-repostory-db";

export const postsRouter = Router({})
postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await postsRepository.findPosts()
    res.status(200).send(posts)

})


postsRouter.post('/', basicAuthGuardMiddleware, postCreateValidators, inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const newPost = await postsRepository.createPost(req.body.title,
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


postsRouter.get('/:id', async (req: Request, res: Response) => {
        const post = await postsRepository.getPostById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id', basicAuthGuardMiddleware, postUpdateValodators, inputValidationMiddleware,
    async (req: Request, res: Response) => {


        const post = await postsRepository.updatePost(
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
        const newPosts = await postsRepository.deletePost(req.params.id)

        if (newPosts) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })





