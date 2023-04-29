// import {blogs} from "./blogs-repository-db";
import {blogsCollection, client, postsCollection} from "../db/db";
import {TPostDb, TPostView} from "../models/posts/posts-type";
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories-db/post-repostory-db";


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