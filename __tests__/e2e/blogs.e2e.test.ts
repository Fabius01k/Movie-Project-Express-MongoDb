// @ts-ignore
import request from 'supertest'
import app from "../../src/app";
import {runDb} from "../../src/db/db";
import exp = require("constants");

const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'


describe('get \ getByID', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('should return 200 and empty array', async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .get('/blogs')
            .expect(200)

        expect(result.body).toEqual({"items": [], "page": 1, "pageSize": 10, "pagesCount": 0, "totalCount": 0})

    }, 10000)

    it('should return status code 404 if blog not found', async () => {
        await request(app)
            .get('/blogs/1')
            .expect(404)
    })

    it('should return 200 and found blog', async () => {
        const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
            name : "blogName",
            description : "blogDescription",
            websiteUrl : "https://dzen.ru"
        }).expect(201)

        const ID = createdBlog.body.id

        const result = await request(app).get(`/blogs/${ID}`).expect(200)
        expect(result.body).toEqual({
            id: ID,
            name: "blogName",
            description: "blogDescription",
            websiteUrl: "https://dzen.ru",
            createdAt: expect.any(String),
            isMembership: false
        })
    })

})

describe('post', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('should return 201 and create blog', async () => {

        const createdBlog = await request(app)
            .post('/blogs')
            .set(auth, basic)
            .send({
                name: 'blogName',
                description: 'blogDescription',
                websiteUrl: 'https://dzen.ru'
            })
            .expect(201)

        expect(createdBlog.body).toEqual({
            createdAt: expect.any(String),
            description: "blogDescription",
            id: expect.any(String),
            isMembership: false,
            name: 'blogName',
            websiteUrl: 'https://dzen.ru'
        })
    })

    it('should`nt create blog with incorrect titles and send 400', async () => {

        const createdBlog = await request(app)
            .post('/blogs')
            .set(auth, basic)
            .send({
                name: '',
                description: '',
                websiteUrl: ''
            })
            .expect(400)
    })


    it('should`nt create blog without authorization and send 401 ', async () => {

        const createdBlog = await request(app)
            .post('/blogs')
            .send({
                name: 'blogName',
                description: 'blogDescription',
                websiteUrl: 'https://dzen.ru'
            })
            .expect(401)
    })
})

describe('delete', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it("should return status code 404 if blog not found", async () => {

        await request(app).delete("/blogs/1").set(auth, basic).expect(404)
    })

    it("should`nt delete blog without authorization and send 401", async () => {

        await request(app)
            .delete("/blogs/1")
            .expect(401)
    })


    describe('put', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it("should return status code 204 if blog found and put successfully", async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name : "blogName",
                description : "blogDescription",
                websiteUrl : "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id
            const updatedBlog = await request(app)
                .put(`/blogs/${blogId}`)
                .set(auth, basic)
                .send({name: "blogName1",
                    description: "blogDescription1",
                    websiteUrl: "https://samurai.it-incubator.io",})
                .expect(204)

        })

        it("should`nt put blog without authorization and send 401 in try put", async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name : "blogName",
                description : "blogDescription",
                websiteUrl : "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id
            const updatedBlog = await request(app)
                .put(`/blogs/${blogId}`)
                .send({name: "blogName1",
                    description: "blogDescription1",
                    websiteUrl: "https://samurai.it-incubator.io",})
                .expect(401)

        })
        it("should return status code 400 if titles is incorrect", async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name : "blogName",
                description : "blogDescription",
                websiteUrl : "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id
            const updatedBlog = await request(app)
                .put(`/blogs/${blogId}`)
                .set(auth, basic)
                .send({name: "",
                    description: "",
                    websiteUrl: "",})
                .expect(400)

        })
    })

    describe('postByBlogId', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it("should return code 201 and created post by blog id", async () => {

            const createdBlog = await request(app)
                .post("/blogs")
                .set(auth, basic)
                .send({
                    name: "blogName",
                    description: "blogDescription",
                    websiteUrl: "https://dzen.ru"
                }).expect(201)

            const blogId = createdBlog.body.id
            const postByBlogID = await request(app)
                .post(`/blogs/${blogId}/posts`)
                .set(auth, basic)
                .send({
                    content: "new post content",
                    shortDescription: "description",
                    title: "post title"
                }).expect(201)
        })

        it("should`nt put the post without authorization and send 401", async () => {

            const createdBlog = await request(app)
                .post("/blogs")
                .set(auth, basic)
                .send({
                    name: "blogName",
                    description: "blogDescription",
                    websiteUrl: "https://dzen.ru"
                }).expect(201)

            const blogId = createdBlog.body.id
            const postByBlogID = await request(app)
                .post(`/blogs/${blogId}/posts`)
                .send({
                    content: "new post content",
                    shortDescription: "description",
                    title: "post title"
                }).expect(401)
        })

        it("should return status code 400 if titles is incorrect", async () => {

            const createdBlog = await request(app)
                .post("/blogs")
                .set(auth, basic)
                .send({
                    name: "blogName",
                    description: "blogDescription",
                    websiteUrl: "https://dzen.ru"
                }).expect(201)

            const blogId = createdBlog.body.id
            const postByBlogID = await request(app)
                .post(`/blogs/${blogId}/posts`)
                .set(auth, basic)
                .send({
                    content: "",
                    shortDescription: "",
                    title: ""
                }).expect(400)
        })

    })



})















