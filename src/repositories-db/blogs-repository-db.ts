import {blogsCollection, client} from "../db/db";
import {TBlogDb, TBlogView} from "../models/blogs/blogs-type";
import {ObjectId} from "mongodb";


type TVblogs = {

    id: string
    name: string
    description: string
    websiteUrl: string
}
const valueWebsiteUrl = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
export let blogs: TBlogDb[] = []
const mapBlogFromDbToView = (blog: TBlogDb): TBlogView => {
    return {
        id: blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

export const blogsRepository = {

    async findBlogs(): Promise<TBlogView[]> {
        const blogs: TBlogDb[] = await blogsCollection.find().toArray();
        return blogs.map(b => mapBlogFromDbToView(b))
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<TBlogView> {

        const dateNow = new Date().getTime().toString()
        const newBlog: TBlogDb = {
            _id: new ObjectId(),
            id: dateNow,
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        await blogsCollection.insertOne(newBlog)

        return mapBlogFromDbToView(newBlog)
    },

    async getBlogById(id: string): Promise<TBlogView | null> {
        const blog: TBlogDb | null = await blogsCollection.findOne({id: id})
        if (!blog) return null
        return mapBlogFromDbToView(blog)

    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const updateBlog = await blogsCollection.
        updateOne({id: id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl,
            },
        })

        const blog = updateBlog.matchedCount === 1
        return blog
    },

    async deleteBlog(id: string): Promise<boolean> {
        const deleteBlog = await blogsCollection.
        deleteOne({id: id})

        return deleteBlog.deletedCount === 1
    }
}
