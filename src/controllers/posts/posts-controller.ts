import {PostsService} from "../../domain/posts-servise";
import {Request, Response} from "express";
import {jwtService} from "../../application/jwt-service";


export class PostsController {
    constructor(
        protected postsService: PostsService
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

        const posts = await this.postsService.findPosts(sortBy, sortDirection, pageSize, pageNumber)
        res.status(200).send(posts)
    }
    async getPostById(req: Request, res: Response) {
        const post = await this.postsService.getPostById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    }
    async getCommentByPostID(req: Request, res: Response) {
        const token = req.cookies.accessToken
        const userId =  await jwtService.getUserIdByToken(token)
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

               const result = await this.postsService.getPostById(req.params.postId)
        if (!result) {
            res.sendStatus(404);
            return
        }

        const post = await this.postsService.findCommentByPostID(sortBy, sortDirection, pageSize, pageNumber, result!.id,userId)
        res.status(200).send(post)
    }
    async createPost(req: Request, res: Response) {

        const newPost = await this.postsService.createPost(
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
        const newComment = await this.postsService.createCommentByPostId(
            req.body.content,
            req.params.postId,
            req.userId!,

        )

        if (newComment) {
            res.status(201).send(newComment)

        } else {
            res.sendStatus(404)
        }
    }
    async updatePost(req: Request, res: Response) {

        const post = await this.postsService.updatePost(
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
        const newPosts = await this.postsService.deletePost(req.params.id)

        if (newPosts) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}