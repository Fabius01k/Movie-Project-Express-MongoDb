import {blogsCollection, client} from "../db/db";


type TVblogs = {

    id: string
    name: string
    description: string
    websiteUrl: string
}
const valueWebsiteUrl = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
export let blogs: TVblogs[] = []



export const blogsRepository = {

    async findBlogs() {
        const blogs = await blogsCollection.find().toArray();
        return blogs
    },

    async createBlog(name: string, description: string, websiteUrl: string) {
        const dateNow = new Date().getTime().toString()
        const newBlog: TVblogs = {
            id: dateNow,
            name: name,
            description: description,
            websiteUrl: websiteUrl

        }
        const createdBlogPromise = await blogsCollection.insertOne(newBlog)

        return createdBlogPromise

    },

    async getBlogById(id: string) {
        const blog = await blogsCollection.findOne({id: id})
        return blog
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string ) {
        const updateBlogPromise = await blogsCollection.
        updateOne({id: id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl,
            },
        })

        const blog = updateBlogPromise.matchedCount === 1
        return blog
    },

    async deleteBlog(id: string) {
        const deleteBlogPromise = await blogsCollection.
        deleteOne({id: id})

        return deleteBlogPromise.deletedCount === 1

    }
}
