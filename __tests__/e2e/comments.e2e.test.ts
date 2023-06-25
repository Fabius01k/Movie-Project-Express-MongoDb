// @ts-ignore
import request from 'supertest'
import app from "../../src/app";


const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

describe('get', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('should return 200 and found comment', async () => {

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

        const commentId = commentByPostId.body.id

        const result = await request(app).get(`/comments/${commentId}`).expect(200)

        expect(result.body).toEqual(
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

    it('should return 404 if comment not found', async () => {

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

        const commentId = null

        const result = await request(app).get(`/comments/${commentId}`).expect(404)
    })
})

describe('put', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it("should return status code 204 if comment found and put successfully", async () => {

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

        const updateComment = await request(app)
            .put(`/comments/${commentByPostId.body.id}`)
            .set(auth, JWTAuth)
            .send({
                content: "stringstringstringsk"
            })
            .expect(204)

        // expect(updateComment.body).toEqual(
        //     {
        //         commentatorInfo:
        //             {
        //                 userId: expect.any(String),
        //                 userLogin: expect.any(String)
        //             },
        //         content: "stringstringstringsk",
        //         createdAt: expect.any(String),
        //         id: expect.any(String)
        //     })
    })

    it("should`nt put comment without authorization and send 401", async () => {

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

        const updateComment = await request(app)
            .put(`/comments/${commentByPostId.body.id}`)
            .send({
                content: "stringstringstringsk"
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

        const updateComment = await request(app)
            .put(`/comments/${commentByPostId.body.id}`)
            .set(auth, JWTAuth)
            .send({
                content: ""
            })
            .expect(400)
    })
})

describe('delete', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })



    it("should return status code 404 if post not found", async () => {
        await request(app).delete('/testing/all-data').expect(204)
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

        await request(app).delete("/comments/1").set(auth, JWTAuth).expect(404)
    })

    it("should`nt delete post without authorization and send 401", async () => {
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

        const createdComment = await request(app)
            .post(`/posts/${postId}/comments/`)
            // .set("Authorization", `Bearer ${JWTAuth}`)
            .set(auth, JWTAuth)
            .send({
                content: "stringstringstringst"
            }).expect(201)

        const deletedPost = await request(app)
            .delete(`/comments/${createdComment.body.id}`)
            .expect(401)
    })

    it("should delete comment and send 204", async () => {
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

        const createdComment = await request(app)
            .post(`/posts/${postId}/comments/`)
            // .set("Authorization", `Bearer ${JWTAuth}`)
            .set(auth, JWTAuth)
            .send({
                content: "stringstringstringst"
            }).expect(201)

        const deletedPost = await request(app)
            .delete(`/comments/${createdComment.body.id}`)
            .set(auth, JWTAuth)
            .expect(204)
    })
})

it("should`nt delete comment if you not owner this comment and send 403", async () => {
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
            login: "user222",
            password: "userPassword222",
            email: "simsbury63125@gmail.com"
        })
        .expect(201)


    const login = await request(app)
        .post("/auth/login")
        .send({
            loginOrEmail: "user222",
            password: "userPassword222",
        }).expect(200)

    const JWT = login.body.accessToken
    const JWTAuth = "Bearer ".concat(JWT)

    const createdUser2 = await request(app)
        .post("/users")
        .set(auth, basic)
        .send({
            login: "user333",
            password: "userPasswort333",
            email: "simsbury651235@gmail.com"
        }).expect(201)

    const login2 = await request(app)
        .post("/auth/login")
        .send({
            loginOrEmail: "user333",
            password: "userPasswort333",
        }).expect(200)

    const JWT2 = login2.body.accessToken
    const JWTAuth2 = "Bearer ".concat(JWT2)

    const createdComment = await request(app)
        .post(`/posts/${postId}/comments/`)
        // .set("Authorization", `Bearer ${JWTAuth}`)
        .set(auth, JWTAuth)
        .send({
            content: "stringstringstringst"
        }).expect(201)

    const deletedPost = await request(app)
        .delete(`/comments/${createdComment.body.id}`)
        .set(auth, JWTAuth2)
        .expect(403)
 },10000)








