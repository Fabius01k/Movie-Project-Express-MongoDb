import {Request, Response, Router} from "express";

import {videosRepository} from "../repositories/videos-repository";
import {blogs, blogsRepository} from "../repositories/blogs-repository";
import {app} from "../index";
import {body, check, header, validationResult} from "express-validator";
import {blogCreateValidators, blogUpdateValidators} from "../validadation/blog-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";


export const blogsRouter = Router({})

blogsRouter.get('/',(req: Request, res: Response) => {
    const blogs = blogsRepository.findBlogs()
    res.status(200).send(blogs)

})

blogsRouter.post('/',blogCreateValidators,basicAuthGuardMiddleware,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newBlog = blogsRepository.createBlog(req.body.name,
            req.body.description,
            req.body.websiteUrl)
        res.status(201).send(newBlog)

})

blogsRouter.get('/:id',(req: Request, res: Response) => {
    const blog = blogsRepository.getBlogById(req.params.id)

    if(blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }

})

blogsRouter.put('/id',blogUpdateValidators,basicAuthGuardMiddleware,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const blog = blogsRepository.updateBlog(

            req.params.id,
            req.body.name,
            req.body.description,
            req.body.websiteUrl)

            if(blog) {
                res.status(204).send(blog) }
            else {
                res.sendStatus(404)
            }

})

blogsRouter.delete('/:id',basicAuthGuardMiddleware,
    (req: Request, res: Response) => {
        const id = req.params.id
        const newBlogs = blogsRepository.deleteBlog(req.params.id)


        if (newBlogs) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

})























