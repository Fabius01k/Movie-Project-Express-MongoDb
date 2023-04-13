import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {validationResult} from "express-validator";
import {blogCreateValidators, blogUpdateValidators} from "../validadation/blog-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../validadation/input-validation-middleware";


export const blogsRouter = Router({})

blogsRouter.get('/',(req: Request, res: Response) => {
    const blogs = blogsRepository.findBlogs()
    res.status(200).send(blogs)

})

blogsRouter.post('/',basicAuthGuardMiddleware, blogCreateValidators,inputValidationMiddleware,
    (req: Request, res: Response) => {

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

blogsRouter.put('/:id', basicAuthGuardMiddleware, blogUpdateValidators,inputValidationMiddleware,
    (req: Request, res: Response) => {
            const blog = blogsRepository.updateBlog(

            req.params.id,
            req.body.name,
            req.body.description,
            req.body.websiteUrl)

            if(blog) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }

})

blogsRouter.delete('/:id',basicAuthGuardMiddleware,
    (req: Request, res: Response) => {

        const newBlogs = blogsRepository.deleteBlog(req.params.id)

        if (newBlogs) {

            res.sendStatus(204)
        } else {

            res.sendStatus(404)
        }

})























