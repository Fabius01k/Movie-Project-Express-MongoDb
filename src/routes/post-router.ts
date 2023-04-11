import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body, validationResult} from "express-validator";

import {blogs} from "../repositories/blogs-repository";
import {postCreateValidators, postUpdateValodators} from "../validadation/post-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
export const postsRouter = Router({})
postsRouter.get('/',(req: Request, res: Response) => {
    const posts = postsRepository.findPosts()
    res.status(200).send(posts)

})



postsRouter.post('/', postCreateValidators,basicAuthGuardMiddleware,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const newPost = postsRepository.createPost(req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.blogId
            )

        res.status(201).send(newPost)


    })


postsRouter.get('/:id',
    (req: Request, res: Response) => {
    const post = postsRepository.getPostById(req.params.id)

    if(post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put('/id',postUpdateValodators,basicAuthGuardMiddleware,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const post = postsRepository.updatePost(
            req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.blogId,
            req.body.blogName)

        if(post) {
            res.status(204).send(post) }
        else {
            res.sendStatus(404)
        }
})


postsRouter.delete('/:id',basicAuthGuardMiddleware,
    (req: Request, res: Response)  => {
    const newPosts = postsRepository.deletePost(req.params.id)

    if (newPosts) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})





