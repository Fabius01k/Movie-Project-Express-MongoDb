import {blogs} from "./blogs-repository-db";
import {client, postsCollection} from "../db/db";


type TVposts = {

    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export let posts: TVposts[] = []

export const postsRepository = {

    async findPosts() {
        const posts = await postsCollection.find().toArray()

        return posts
    },

    async createPost(title: string, shortDescription: string, content: string,
                     blogId: string) {

        const dateNow = new Date().getTime().toString()
        const blog = blogs.find(blog => blog.id === blogId)

        if (!blog) {
            return null
        }

        const newPost: TVposts = {
            id: dateNow,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name


        }
        const createdPostPromise = await postsCollection.insertOne(newPost)

        return createdPostPromise


    },

    async getPostById(id: string) {
        const post = await postsCollection.findOne({id: id})
        return post

    },

    async updatePost(id: string, title: string, shortDescription: string, content: string,
                     blogId: string) {
        const blog = blogs.find(blog => blog.id === blogId)

        if (!blog) {
            return null
        }
        const updatePostPromise = await postsCollection.
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
    },

    async deletePost(id: string) {
        const deletePostPromise = await postsCollection.
        deleteOne({id: id})

        return deletePostPromise.deletedCount === 1

    }
}