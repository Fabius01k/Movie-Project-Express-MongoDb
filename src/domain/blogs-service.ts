import {blogsCollection, client} from "../db/db";
import {TBlogDb, TBlogView} from "../models/blogs/blogs-type";
import {ObjectId} from "mongodb";
import {blogsRepository} from "../repositories-db/blogs-repository-db";


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

export const blogsService = {

    async findBlogs(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number,searchNameTerm: string | null) {
        return blogsRepository.findBlogs(
            sortBy,sortDirection,pageSize,pageNumber,searchNameTerm
        )
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

        const createdBlogService = await blogsRepository.createBlog(newBlog)

        return createdBlogService
    },

    async getBlogById(id: string): Promise<TBlogView | null> {
        return blogsRepository.getBlogById(id)
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlog(id,name,description,websiteUrl)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    }
}
