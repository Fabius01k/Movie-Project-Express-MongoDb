// import {blogs} from "./blogs-repository-db";
import {blogsCollection, client, postsCollection, usersCollection} from "../db/db";
import {TPostDb, TPostView} from "../models/posts/posts-type";
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories-db/post-repostory-db";
import {CommentsRepository} from "../repositories-db/comments-repository-db";
import {TcommentDb, TcommentView} from "../models/comments/comments-type";
import {jwtService} from "../application/jwt-service";
import {settings} from "../application/settings";

import {authMiddleware} from "../middlewares/auth-middleware";


type TVposts = {

    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export let posts: TVposts[] = []

const mapPostFromDbView = (post: TPostDb): TPostView => {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const postsServise = {

    async findPosts(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number) {
        return postsRepository.findPosts(
            sortBy,sortDirection,pageSize,pageNumber
        )
    },

    async findCommentByPostID(sortBy: string,sortDirection: 'asc' | 'desc',
                              pageSize: number,pageNumber: number, postId: string) {
        return CommentsRepository.findCommentByPostID(sortBy,sortDirection,pageSize,pageNumber,postId
        )

    },

    async createPost(title: string, shortDescription: string, content: string,
                     blogId: string): Promise<TPostView | null> {

        const dateNow = new Date().getTime().toString()
        const blog = await blogsCollection.findOne({id: blogId})

        if (!blog) {
            return null
        }

        const newPost: TPostDb = {
            _id: new ObjectId(),
            id: dateNow,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),

        }
        const createdPostService = await postsRepository.createPost(newPost)

        return createdPostService
    },

    async createCommentByPostId(content: string, postId: string,userId: string ): Promise<TcommentView | null> {

        const dateNow = new Date().getTime().toString()

        const post = await postsCollection.findOne({id: postId})
        if(!post) {
            console.log("post not found")
            return null
        }
        console.log(postId, "postId")
        console.log(userId, "userId")
        const user = await usersCollection.findOne({id: userId})
        if(!user) {
            console.log("user not found")
            return null
        }



        const newComment: TcommentDb = {
            _id: new ObjectId(),
            id: dateNow,
            content: content,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            postId:postId
        }
        const createdCommentService = await CommentsRepository.createCommentByPostId(newComment)

        return createdCommentService

    },

    async getPostById(id: string): Promise<TPostView | null> {
        return postsRepository.getPostById(id)

    },

    async updatePost(id: string, title: string, shortDescription: string, content: string,
                     blogId: string): Promise<boolean | null> {
        return await postsRepository.updatePost(id,title,shortDescription,content,blogId)
    },

    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)

    }
}