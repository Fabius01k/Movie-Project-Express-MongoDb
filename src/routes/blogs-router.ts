import {Request, Response, Router} from "express";
// import {blogsRepository} from "../repositories-in-memory/blogs-repository";
import {blogsRepository} from "../repositories-db/blogs-repository-db";
import {validationResult} from "express-validator";
import {blogCreateValidators, blogUpdateValidators} from "../validadation/blog-validation";
import {basicAuthGuardMiddleware} from "../validadation/authorization-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {blogsService} from "../domain/blogs-service";

import {postsServise} from "../domain/posts-servise";
import {postCreateByBlogValidator, postCreateValidators} from "../validadation/post-validation";


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    let searchNameTerm: string | null = req.query.searchNameTerm as any
    if(!searchNameTerm) {
        searchNameTerm = null
    }

    let sortBy: string = req.query.sortBy as any
    if(!sortBy) {
        sortBy = 'createdAt'
    }

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

    const blogs = await blogsService.findBlogs(sortBy,sortDirection,pageSize,pageNumber,searchNameTerm)
    res.status(200).send(blogs)

})

blogsRouter.get('/:blogId/posts', async (req: Request, res: Response) => {
    let sortBy: string = req.query.sortBy as any
    if(!sortBy) {
        sortBy = 'createdAt'
    }

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

    const result = await blogsService.getBlogById(req.params.blogId)
    if (!result) {
        res.sendStatus(404);
        return
    }


    const blogs = await blogsService.findPostByBlogID(sortBy,sortDirection,pageSize,pageNumber, result!.id)
    res.status(200).send(blogs)

})

blogsRouter.post('/', basicAuthGuardMiddleware, blogCreateValidators, inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const newBlog = await blogsService.createBlog(req.body.name,
            req.body.description,
            req.body.websiteUrl)
        res.status(201).send(newBlog)

    })

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog = await blogsService.getBlogById(req.params.id)

    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }

})

blogsRouter.post('/:blogId/posts', basicAuthGuardMiddleware, postCreateByBlogValidator,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const newPost = await blogsService.createPostByBlogID(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.params.blogId
    )
        if (newPost) {
            res.status(201).send(newPost)

        } else {
            res.sendStatus(404)
        }

})

blogsRouter.put('/:id', basicAuthGuardMiddleware, blogUpdateValidators, inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const blog = await blogsService.updateBlog(
            req.params.id,
            req.body.name,
            req.body.description,
            req.body.websiteUrl
    )

        if (blog) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    })

blogsRouter.delete('/:id', basicAuthGuardMiddleware,
    async (req: Request, res: Response) => {

        const newBlogs = await blogsService.deleteBlog(req.params.id)

        if (newBlogs) {

            res.sendStatus(204)
        } else {

            res.sendStatus(404)
        }

    })























