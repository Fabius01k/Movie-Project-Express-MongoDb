// @ts-ignore
import request from 'supertest'
import app from "../../src/app";


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
            .get('/posts')
            .expect(200)

        expect(result.body).toEqual({"items": [], "page": 1, "pageSize": 10, "pagesCount": 0, "totalCount": 0})

    })

    it('should return status code 404 if post not found', async () => {
        await request(app)
            .get('/posts/1')
            .expect(404)
    })

    it('should return 200 and found post', async () => {
        const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
            name: "blogName",
            description: "blogDescription",
            websiteUrl: "https://dzen.ru"
        }).expect(201)

        const blogId = createdBlog.body.id

        const result = await request(app)
            .post("/posts")
            .set(auth, basic)
            .send({
                "content": "postContent",
                "shortDescription": "postShortDescription",
                "title": "postTitle",
                "blogId": `${blogId}`
            })
            .expect(201)

        expect(result.body).toEqual({
            "id": expect.any(String),
            "blogId": blogId,
            "blogName": "blogName",
            "content": "postContent",
            "createdAt": expect.any(String),
            "shortDescription": "postShortDescription",
            "title": "postTitle"
        })

        const foundPost = await request(app)
            .get(`/posts/${result.body.id}`)
            .set(auth, basic)
            .expect(200)
        expect(foundPost.body).toEqual({
            "id": expect.any(String),
            "blogId": blogId,
            "blogName": "blogName",
            "content": "postContent",
            "createdAt": expect.any(String),
            "shortDescription": "postShortDescription",
            "title": "postTitle"
        })
    })

    describe('post', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it('should return 201 and create post', async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            expect(createdPost.body).toEqual({
                "id": expect.any(String),
                "blogId": blogId,
                "blogName": "blogName",
                "content": "postContent",
                "createdAt": expect.any(String),
                "shortDescription": "postShortDescription",
                "title": "postTitle"
            })
        })

        it('should`nt create post with incorrect titles and send 400', async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "",
                    "shortDescription": "",
                    "title": "",
                    "blogId": `${blogId}`
                })
                .expect(400)
        })

        it('should`nt create post without authorization and send 401', async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(401)
        })

        // it('should`nt create post without found blog and send 404', async () => {
        //
        //     const createdPost = await request(app)
        //         .post("/posts")
        //         .set(auth, basic)
        //         .send({
        //             "content": "postContent",
        //             "shortDescription": "postShortDescription",
        //             "title": "postTitle",
        //             "blogId": ``
        //         })
        //         .expect(404)
        // })
    })

    describe('delete', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it("should return status code 404 if post not found", async () => {

            await request(app).delete("/posts/1").set(auth, basic).expect(404)
        })

        it("should`nt delete post without authorization and send 401", async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            expect(createdPost.body).toEqual({
                "id": expect.any(String),
                "blogId": blogId,
                "blogName": "blogName",
                "content": "postContent",
                "createdAt": expect.any(String),
                "shortDescription": "postShortDescription",
                "title": "postTitle"
            })

            const deletedPost = await request(app)
                .delete(`/posts/${createdPost.body.id}`)
                .expect(401)
        })


        it("should delete post and send 204", async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            expect(createdPost.body).toEqual({
                "id": expect.any(String),
                "blogId": blogId,
                "blogName": "blogName",
                "content": "postContent",
                "createdAt": expect.any(String),
                "shortDescription": "postShortDescription",
                "title": "postTitle"
            })

            const deletedPost = await request(app)
                .delete(`/posts/${createdPost.body.id}`)
                .set(auth, basic)
                .expect(204)
        })
    })

    describe('put', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it("should return status code 204 if post found and put successfully", async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id
            const updatePost = await request(app)
                .put(`/posts/${createdPost.body.id}`)
                .set(auth, basic)
                .send({
                    content: "postContent1",
                    shortDescription: "shortDescription1",
                    title: "title1",
                    "blogId": `${blogId}`
                })
                .expect(204)

        })

        it("should`nt put post without authorization and send 401 in try put", async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id
            const uddatePost = await request(app)
                .put(`/posts/${createdPost.body.id}`)
                .send({
                    content: "postContent1",
                    shortDescription: "shortDescription1",
                    title: "title1",
                    "blogId": `${blogId}`
                })
                .expect(401)

        })
        it("should return status code 400 if titles is incorrect", async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id
            const uddatePost = await request(app)
                .put(`/posts/${createdPost.body.id}`)
                .set(auth, basic)
                .send({
                    content: "",
                    shortDescription: "",
                    title: "",
                    "blogId": `${blogId}`
                })
                .expect(400)

        })
    })

    describe('commentByPostId', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it("should return code 201 and created comment by post id", async () => {
            await request(app).delete('/testing/all-data').expect(204)

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id

            const createdUser = await request(app)
                .post("/users")
                .set(auth, basic)
                .send({
                    login: "userLogin",
                    password: "userPassword",
                    email: "simsbury65@gmail.com"
                }).expect(201)

            const login = await request(app)
                .post("/auth/login")
                .send({
                    loginOrEmail: "userLogin",
                    password: "userPassword",
                }).expect(200)

            const JWT = login.body.accessToken
            const JWTAuth = "Bearer ".concat(JWT)

            const commentByPostId = await request(app)
                .post(`/posts/${postId}/comments/`)
                // .set("Authorization", `Bearer ${JWTAuth}`)
                .set(auth, JWTAuth)
                .send({
                    content: "stringstringstringst"
                }).expect(201)

            expect(commentByPostId.body).toEqual(
                {
                    commentatorInfo:
                        {
                            userId: expect.any(String),
                            userLogin: expect.any(String)
                        },
                    content: "stringstringstringst",
                    createdAt: expect.any(String),
                    id: expect.any(String)
                })
        })

        it("should return status code 400 if titles is incorrect", async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id

            const createdUser = await request(app)
                .post("/users")
                .set(auth, basic)
                .send({
                    login: "userLogin",
                    password: "userPassword",
                    email: "simsbury65@gmail.com"
                }).expect(201)

            const login = await request(app)
                .post("/auth/login")
                .send({
                    loginOrEmail: "userLogin",
                    password: "userPassword",
                }).expect(200)

            const JWT = login.body.accessToken
            const JWTAuth = "Bearer ".concat(JWT)

            const commentByPostId = await request(app)
                .post(`/posts/${postId}/comments/`)
                // .set("Authorization", `Bearer ${JWTAuth}`)
                .set(auth, JWTAuth)
                .send({
                    content: ""
                }).expect(400)


        })
        it("\"should`nt create post without authorization and send 401", async () => {
            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id

            const createdUser = await request(app)
                .post("/users")
                .set(auth, basic)
                .send({
                    login: "userLogin",
                    password: "userPassword",
                    email: "simsbury65@gmail.com"
                }).expect(201)

            const login = await request(app)
                .post("/auth/login")
                .send({
                    loginOrEmail: "userLogin",
                    password: "userPassword",
                }).expect(200)

            const JWT = login.body.accessToken
            const JWTAuth = "Bearer ".concat(JWT)

            const commentByPostId = await request(app)
                .post(`/posts/${postId}/comments/`)

                .send({
                    content: "stringstringstringst"
                }).expect(401)

        })
    })


    describe('commentByPostId', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it('should return 200 and found comment by post id', async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = createdPost.body.id

            const createdUser = await request(app)
                .post("/users")
                .set(auth, basic)
                .send({
                    login: "userLogin",
                    password: "userPassword",
                    email: "simsbury65@gmail.com"
                }).expect(201)

            const login = await request(app)
                .post("/auth/login")
                .send({
                    loginOrEmail: "userLogin",
                    password: "userPassword",
                }).expect(200)

            const JWT = login.body.accessToken
            const JWTAuth = "Bearer ".concat(JWT)

            const commentByPostId = await request(app)
                .post(`/posts/${postId}/comments/`)
                // .set("Authorization", `Bearer ${JWTAuth}`)
                .set(auth, JWTAuth)
                .send({
                    content: "stringstringstringst"
                }).expect(201)

            const result = await request(app).get(`/posts/${postId}/comments`).expect(200)
            // expect(result.body).toEqual({
            //     commentatorInfo:
            //         {
            //             userId: expect.any(String),
            //             userLogin: expect.any(String)
            //         },
            //     content: "stringstringstringst",
            //     createdAt: expect.any(String),
            //     id: expect.any(String)
            // })

        })
        it('should return status code 404 if comment not found', async () => {

            const createdBlog = await request(app).post("/blogs").set(auth, basic).send({
                name: "blogName",
                description: "blogDescription",
                websiteUrl: "https://dzen.ru"
            }).expect(201)

            const blogId = createdBlog.body.id

            const createdPost = await request(app)
                .post("/posts")
                .set(auth, basic)
                .send({
                    "content": "postContent",
                    "shortDescription": "postShortDescription",
                    "title": "postTitle",
                    "blogId": `${blogId}`
                })
                .expect(201)

            const postId = null

            const createdUser = await request(app)
                .post("/users")
                .set(auth, basic)
                .send({
                    login: "userLogin",
                    password: "userPassword",
                    email: "simsbury65@gmail.com"
                }).expect(201)

            const login = await request(app)
                .post("/auth/login")
                .send({
                    loginOrEmail: "userLogin",
                    password: "userPassword",
                }).expect(200)

            const JWT = login.body.accessToken
            const JWTAuth = "Bearer ".concat(JWT)

            const commentByPostId = await request(app)
                .post(`/posts/${postId}/comments/`)
                // .set("Authorization", `Bearer ${JWTAuth}`)
                .set(auth, JWTAuth)
                .send({
                    content: "stringstringstringst"
                }).expect(404)


            const result = await request(app).get(`/posts/${postId}/comments`).expect(404)
        })

    })





})