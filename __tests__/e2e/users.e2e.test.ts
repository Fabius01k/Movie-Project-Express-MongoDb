// @ts-ignore
import request from 'supertest'
import app from "../../src/app";


const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'


describe('get', () => {
    it('should return 200 and empty array', async () => {
        // await request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .get('/admin/users/get-all-users')
            .set(auth, basic)
            .expect(200)

        expect(result.body).toEqual({"items": [], "page": 1, "pageSize": 10, "pagesCount": 0, "totalCount": 0})
    },30000)

    // it('should return 401 without authorization for get users ', async () => {
    //     await request(app).delete("/testing/all-data").set(auth, basic)
    //     const result = await request(app)
    //         .get('/users')
    //         .expect(401)
    // })
})

    describe('post', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it('should create user and return 201', async () => {

        const createdUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "userLogin",
                password: "userPassword",
                email: "simsbury65@gmail.com"
            }).expect(201)

        expect(createdUser.body).toEqual({
            "id": expect.any(String),
            "login": "userLogin",
            "email": "simsbury65@gmail.com",
            "createdAt": expect.any(String),
        })



    },10000)
        it('should`nt create user with incorrect titles and send 400', async () => {

            const createdUser = await request(app)
                .post("/users")
                .set(auth, basic)
                .send({
                    login: "",
                    password: "",
                    email: ""
                }).expect(400)

        })

        it('should`nt create user without authorization and send 401', async () => {

            const createdUser = await request(app)
                .post("/users")
                .send({
                    login: "userLogin",
                    password: "userPassword",
                    email: "simsbury65@gmail.com"
                }).expect(401)
        })
    })

describe('delete', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it("should return status code 404 if user not found", async () => {

        await request(app).delete("/users/1").set(auth, basic).expect(404)
    })

    it("should`nt delete user without authorization and send 401", async () => {

        const createdUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "userLogin",
                password: "userPassword",
                email: "simsbury65@gmail.com"
            }).expect(201)

        const deletedUser = await request(app)
            .delete(`/users/${createdUser.body.id}`)
            .expect(401)
    })

    it("should delete user and send 204", async () => {

        const createdUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "userLogin",
                password: "userPassword",
                email: "simsbury65@gmail.com"
            }).expect(201)

        const deletedUser = await request(app)
            .delete(`/users/${createdUser.body.id}`)
            .set(auth, basic)
            .expect(204)

    })

})

