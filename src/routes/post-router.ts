import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body, validationResult} from "express-validator";

import {blogs} from "../repositories/blogs-repository";
export const postsRouter = Router({})
postsRouter.get('/',(req: Request, res: Response) => {
    const posts = postsRepository.findPosts()
    res.status(200).send(posts)

})

const postCreateValidators = [
    body('blogId').isString().notEmpty().custom((value: string) => {
    const blog = blogs.find(blog => blog.id === value)
    if (!blog) {
        throw new Error('Blog ID is not valid');
    }
    return true }),
    body('title').isString().notEmpty().
    trim().isLength({min:1,max:30}).
    withMessage('title is not correct'),

    body('shortDescription').isString().notEmpty().
    trim().isLength({min:1,max:100}).
    withMessage('shortDescription is not correct'),

    body('content').isString().notEmpty().
    trim().isLength({min:1,max:1000}).
    withMessage('content is not correct'),
]

postsRouter.post('/', postCreateValidators,
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // const presentBlogs = blogsRepository.findBlogs()
        // if (!blogId || !presentBlogs.filter(x => x.id === blogId)) {

       // }


        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const blogId = req.body.blogId


        const newPost = postsRepository.createPost(req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.blogId
            )

        res.status(201).send(newPost)


    })


postsRouter.get('/:id',(req: Request, res: Response) => {
    const id = req.params.id
    const post = postsRepository.getPostById(req.params.id)

    if(post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put('/id',
    body('title').isString().notEmpty().
    trim().isLength({min:1,max:30}).
    withMessage('title is not correct'),

    body('shortDescription').isString().notEmpty().
    trim().isLength({min:1,max:100}).
    withMessage('shortDescription is not correct'),

    body('content').isString().notEmpty().
    trim().isLength({min:1,max:1000}).
    withMessage('content is not correct'),

    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const blogId = req.body.blogId
        const blogName = req.body.blogName
        const id = req.params.id

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


postsRouter.delete('/:id',(req: Request, res: Response)  => {
    const id = req.params.id
    const newPosts = postsRepository.deletePost(req.params.id)

    if (newPosts) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})





