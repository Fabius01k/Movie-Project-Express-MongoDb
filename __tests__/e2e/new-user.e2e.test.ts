// @ts-ignore
import request from "supertest";
import app from "../../src/app";
import {runDb} from "../../src/db/db";

const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

describe('Get all users by admin', () => {
    beforeAll(async () => {
        await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })
    it('This test will return an empty array and code 200', async () => {
        const users = await request(app)
            .get('/admin/users/get-all-users')
            .set(auth, basic)
            .expect(200)

        expect(users.body).toEqual({"items": [], "page": 1, "pageSize": 10, "pagesCount": 0, "totalCount": 0})
    })

    it('This test will return a 401 code error when attempting a request without authorization ', async () => {
        await request(app).delete("/testing/all-data").set(auth, basic)
        const result = await request(app)
            .get('/admin/users/get-all-users')
            .expect(401)
    })

    it('This test should create user and return it in array with code 200 ', async () => {
        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })

        const users = await request(app)
            .get('/admin/users/get-all-users')
            .set(auth, basic)
            .expect(200)

        expect(users.body).toEqual({"items": [
                {
                    id: expect.any(String),
                    createdAt: expect.any(String),
                    accountData: {
                        name: "name",
                        age: "18",
                        sex: "man",
                        login: "login",
                        email: "emailUser@gmail.com"
                    },
                    passwordData: {
                        passwordHash: expect.any(String),
                        passwordSalt: expect.any(String)
                    },
                    emailConfirmationData: {
                        confirmationCode: expect.any(String),
                        expirationDate: expect.any(String),
                        isConfirmed: true
                    },
                    passwordUpdateData: {
                        resetPasswordCode: null,
                        expirationDatePasswordCode: expect.any(String)
                    },
                    userTags: []
                }
            ], "page": 1, "pageSize": 10, "pagesCount": 1, "totalCount": 1})
    })
})

describe('Get user by id by admin', () => {
    beforeAll(async () => {
        await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })
    it('This test will return an error and a 404 code when trying to find a user who is not there', async () => {
        const users = await request(app)
            .get('/admin/users/1')
            .set(auth, basic)
            .expect(404)
    })

    it('This test should create user and return it with code 201 ', async () => {
        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })

        const userId = createUser.body.id

        const user = await request(app)
            .get(`/admin/users/${userId}`)
            .set(auth, basic)
            .expect(200)

        expect(user.body).toEqual(
                {
                    id: expect.any(String),
                    createdAt: expect.any(String),
                    accountData: {
                        name: "name",
                        age: "18",
                        sex: "man",
                        login: "login",
                        email: "emailUser@gmail.com"
                    },
                    passwordData: {
                        passwordHash: expect.any(String),
                        passwordSalt: expect.any(String)
                    },
                    emailConfirmationData: {
                        confirmationCode: expect.any(String),
                        expirationDate: expect.any(String),
                        isConfirmed: true
                    },
                    passwordUpdateData: {
                        resetPasswordCode: null,
                        expirationDatePasswordCode: expect.any(String)
                    },
                    userTags: []
                })
    })

    it('This code will return an error and a 401 code when trying to find a user without authorization ', async () => {

        await request(app).delete('/testing/all-data').expect(204)
        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })

        const userId = createUser.body.id

        const user = await request(app)
            .get(`/admin/users/${userId}`)
            .expect(401)
    })
})

describe('Create user by admin', () => {

    beforeAll(async () => {
        await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('This test will create a user and return it with the code 201', async () => {

        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })
    })

    it('This test should return an error and code 400 if the titles are incorrect', async () => {
        await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "",
                age: "",
                sex: "",
                login: "",
                password: "",
                email: ""
            })
            .expect(400)
    })

    it('This test will return a 401 error when trying to create a user without authorization', async () => {
        await request(app)
            .post("/admin/users/create-user")
            .send({
            name: "name",
            age: "18",
            sex: "man",
            login: "login",
            password: "password",
            email: "emailUser@gmail.com"
        })
            .expect(401)
    })
})

describe('Update user by admin', () => {

    beforeAll(async () => {
        await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('This test should create a user and update it with the code 204', async () => {

        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })
        console.log(createUser.body.id)

        const updatedUser = await request(app)
            .put(`/admin/users/update-user/${createUser.body.id}`)
            .set(auth, basic)
            .send({
                name: "name2",
                age: "19",
                sex: "man",
                login: "login2",
                password: "password2",
                email: "emailUser2@gmail.com"
            })
            .expect(204)
    })

    it('This test should return an error and code 400 if the titles are incorrect', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })


        await request(app)
            .put(`/admin/users/update-user/${createUser.body.id}`)
            .set(auth, basic)
            .send({
                name: "",
                age: "",
                sex: "",
                login: "",
                password: "",
                email: ""
            })
            .expect(400)
    })

    it('This test will return a 401 error when trying to put a user without authorization', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })

        await request(app)
            .put(`/admin/users/update-user/${createUser.body.id}`)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(401)
    })

    it('This test will return a 404 error when trying to update a user who does not exist', async () => {
        await request(app)
            .post("/admin/users/update-user/1")
            .set(auth, basic)
            .expect(404)
    })
})

describe('Delete user by admin', () => {

    beforeAll(async () => {
        await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('This test will create a user and delete it with code 204', async () => {
        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })
         await request(app)
            .delete(`/admin/users/delete-user/${createUser.body.id}`)
            .set(auth, basic)
            .expect(204)
    })



    it('This test will return a 401 error when trying to delete a user without authorization', async () => {

        const createUser = await request(app)
            .post("/admin/users/create-user")
            .set(auth, basic)
            .send({
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                password: "password",
                email: "emailUser@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            accountData: {
                name: "name",
                age: "18",
                sex: "man",
                login: "login",
                email: "emailUser@gmail.com"
            },
            passwordData: {
                passwordHash: expect.any(String),
                passwordSalt: expect.any(String)
            },
            emailConfirmationData: {
                confirmationCode: expect.any(String),
                expirationDate: expect.any(String),
                isConfirmed: true
            },
            passwordUpdateData: {
                resetPasswordCode: null,
                expirationDatePasswordCode: expect.any(String)
            },
            userTags: []
        })

        await request(app)
            .delete(`/admin/users/delete-user/${createUser.body.id}`)
            .expect(401)
    })

    it('This test will return a 404 error when trying to delete a user who does not exist', async () => {
        await request(app)
            .post("/admin/users/update-user/1")
            .set(auth, basic)
            .expect(404)
    })
})