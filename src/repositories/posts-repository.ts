import {blogs, blogsRepository} from "./blogs-repository";

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
    findPosts() {
        return posts
    },


    createPost(title: string, shortDescription: string, content: string,
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

        posts.push(newPost)
        return newPost

    },

    getPostById(id: string) {
        const post = posts.find(p => p.id === id)
        return post
    },


    updatePost(id: string, title: string, shortDescription: string, content: string,
               blogId: string) {
        const blog = blogs.find(blog => blog.id === blogId)

        if (!blog) {
            return null
        }
        const post = posts.find(p => p.id === id)
        if (post) {

            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            post.blogName = blog.name
            return post
        }

        return null
    },

    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false

    }

}