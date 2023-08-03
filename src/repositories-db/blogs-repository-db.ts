// import {blogsCollection, client, postsCollection} from "../db/db";
import {TBlogDb, TBlogView} from "../models/blogs/blogs-type";
import {ObjectId} from "mongodb";
import {TPostDb, TPostView} from "../models/posts/posts-type";
import {mapPostFromDbView} from "./post-repostory-db";
import {blogsModel} from "../db/db";

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

    async findBlogs(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number,searchNameTerm: string | null){

        const filter = !searchNameTerm
            ? {}
            : {
            name: new RegExp(searchNameTerm, 'gi')
        }
        // const filter: FilterQuery<typeof Blogs> = {};
        //
        // if (pagination.searchNameTerm !== null) {
        //     filter.name = { $regex: pagination.searchNameTerm, $options: "i" };
        // }

        const blogs: TBlogDb[] = await blogsModel
            .find(filter)
            // .sort(sortBy,sortDirection) // hm 9
            .sort({ sortBy: sortDirection })
            .skip((pageNumber - 1) * pageSize)
            .limit(+pageSize)
            .lean()


        const items = blogs.map(b => mapBlogFromDbToView(b))
        const totalCount = await blogsModel.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }
    },

    async createBlog(newBlog: TBlogDb): Promise<TBlogView> {
        await blogsModel.insertMany([newBlog])

        return mapBlogFromDbToView(newBlog)
    },

    async createPostById(newPost: TPostDb): Promise<TPostView | null> {

        // await postsCollection.insertOne(newPost)
        return mapPostFromDbView(newPost)
    },

    async getBlogById(id: string): Promise<TBlogView | null> {
        const blog: TBlogDb | null = await blogsModel.findOne({id: id})
        if (!blog) return null

        return mapBlogFromDbToView(blog)

    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const updateBlog = await blogsModel.
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
        const deleteBlog = await blogsModel
            .deleteOne({id: id})

        return deleteBlog.deletedCount === 1
    }
}
