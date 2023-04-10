


type TVblogs = {

    id: string
    name: string
    description: string
    websiteUrl: string
}
const valueWebsiteUrl = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
export let blogs: TVblogs[] = []



export const blogsRepository = {

    findBlogs() {
        return blogs
    },


    createBlog(name: string, description: string, websiteUrl: string) {

        const dateNow = new Date()
        const newBlog: TVblogs = {
            id: dateNow.toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl

        }
        blogs.push(newBlog)
        return newBlog

    },

    getBlogById(id: string) {
        const blog = blogs.find(b => b.id === id)
        return blog
    },


    updateBlog(id: string, name: string, description: string, websiteUrl: string ) {

        const blog = blogs.find(b => b.id === id)
        if (blog) {

            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return blog
        }

        return null
    },

    deleteBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
            }
        }
        return false


    }









}
