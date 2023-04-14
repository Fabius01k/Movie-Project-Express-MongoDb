import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body, validationResult} from "express-validator";

import {blogs} from "../repositories/blogs-repository";
import {postCreateValidators, postUpdateValodators} from "../validadation/post-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../validadation/input-validation-middleware";

export const postsRouter = Router({})
postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.findPosts()
    res.status(200).send(posts)

})


postsRouter.post('/', basicAuthGuardMiddleware, postCreateValidators, inputValidationMiddleware,
    (req: Request, res: Response) => {

        const newPost = postsRepository.createPost(req.body.title,
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


postsRouter.get('/:id',
    (req: Request, res: Response) => {
        const post = postsRepository.getPostById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.put('/:id', basicAuthGuardMiddleware, postUpdateValodators, inputValidationMiddleware,
    (req: Request, res: Response) => {


        const post = postsRepository.updatePost(
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
    (req: Request, res: Response) => {
        const newPosts = postsRepository.deletePost(req.params.id)

        if (newPosts) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })





