import {Request, Response, Router} from "express";

import {videosRepository} from "../repositories/videos-repository";
import {blogs, blogsRepository} from "../repositories/blogs-repository";
import {app} from "../index";
import {body, check, header, validationResult} from "express-validator";


export const blogsRouter = Router({})

blogsRouter.get('/',(req: Request, res: Response) => {
    const blogs = blogsRepository.findBlogs()
    res.status(200).send(blogs)

})

blogsRouter.post('/',

    body('name').isString().notEmpty().
    trim().isLength({min:1,max:15}).withMessage('name is not correct'),

    body('description').isString().trim().notEmpty().isLength({min:1,max:500}).
    withMessage('description is not correct'),


    body('websiteUrl').isString().trim().notEmpty().isLength({min:1,max:100}).
    matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).
    withMessage('websiteUrl is not correct'),

    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl


        const newBlog = blogsRepository.createBlog(req.body.name,
            req.body.description,
            req.body.websiteUrl)
        res.status(201).send(newBlog)

})

blogsRouter.get('/:id',(req: Request, res: Response) => {
    const id = req.params.id
    const blog = blogsRepository.getBlogById(req.params.id)

    if(blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }

})

blogsRouter.put('/id',
    body('name').isString().notEmpty().
    trim().isLength({min:1,max:15}).withMessage('name is not correct'),

    body('description').isString().trim().notEmpty().isLength({min:1,max:500}).
    withMessage('description is not correct'),


    body('websiteUrl').isString().trim().notEmpty().isLength({min:1,max:100}).
    matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).
    withMessage('websiteUrl is not correct'),


    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const name = req.body.name
        const description = req.body.description
        const websiteUrl = req.body.websiteUrl


        const id = req.params.id
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

blogsRouter.delete('/:id',(req: Request, res: Response) => {
        const id = req.params.id
        const newBlogs = blogsRepository.deleteBlog(req.params.id)


        if (newBlogs) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

})























