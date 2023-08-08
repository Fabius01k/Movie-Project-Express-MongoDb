import {blogs} from "./blogs-repository-db";
import {blogsModel, postsModel} from "../db/db";
import {TPostView} from "../models/posts/posts-type";
import {ObjectId} from "mongodb";
import {ClassPostDb} from "../classes/posts/posts-class";

export let posts: ClassPostDb[] = []

 export const mapPostFromDbView = (post: ClassPostDb): TPostView => {
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

export class PostsRepostory {
    async findPosts(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number) {
        const posts: ClassPostDb[] = await postsModel.find()
            // sort(sortBy,sortDirection).
            .sort({ sortBy: sortDirection })
            .skip((pageNumber-1)*pageSize)
            .limit(+pageSize)
            .lean()

        const items = posts.map(p => mapPostFromDbView(p))
        const totalCount = await postsModel.countDocuments()

        return {
            pagesCount: Math.ceil(totalCount/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }
    }
    async createPost(newPost: ClassPostDb): Promise<TPostView | null> {

        await postsModel.insertMany([newPost])

        return mapPostFromDbView(newPost)
    }
    async createPostByBlogId(newPost: ClassPostDb): Promise<TPostView | null> {

        await postsModel.insertMany([newPost])

        return mapPostFromDbView(newPost)
    }
    async findPostsByBlogId(sortBy: string,sortDirection: 'asc' | 'desc',
                            pageSize: number,pageNumber: number,blogId: string) {

        /*const filter = !blogId
            ? {}
            : {
                id: new RegExp(blogId,'gi')
            }
*/
        const posts: ClassPostDb[] = await postsModel
            .find({blogId: blogId})
            // sort(sortBy,sortDirection)
            .sort({ sortBy: sortDirection })
            .skip((pageNumber-1)*pageSize)
            .limit(+pageSize)
            .lean()


        const items = posts.map(p => mapPostFromDbView(p))
        const totalCount = await postsModel.countDocuments({blogId: blogId})

        return {
            pagesCount: Math.ceil(totalCount/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }
    }
    async getPostById(id: string): Promise<TPostView | null> {
        const post: ClassPostDb | null = await postsModel.findOne({id: id})
        if(!post) return null

        return mapPostFromDbView(post)
    }
    async updatePost(id: string, title: string, shortDescription: string, content: string,
                     blogId: string): Promise<boolean | null> {
        const blog = await blogsModel.findOne({id: blogId})

        if (!blog) {
            return null
        }
        const updatePostPromise = await postsModel.
        updateOne({id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog.name,
            },
        })
        const post = updatePostPromise.matchedCount === 1
        return post
    }
    async deletePost(id: string): Promise<boolean> {
        const deletePostPromise = await postsModel.
        deleteOne({id: id})

        return deletePostPromise.deletedCount === 1
    }
}
