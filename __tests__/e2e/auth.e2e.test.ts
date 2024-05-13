// @ts-ignore
import request from 'supertest'
import app from "../../src/app";
import mongoose from 'mongoose'
import {runDb} from "../../src/db/db";

const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

describe('post', () => {
    beforeAll(async () => {
        await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('This test should create a user and login it', async () => {
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

        const loginUser = await request(app)
            .post("/authentication/login")
            .send({
                loginOrEmail: "emailUser@gmail.com",
                password: "password"
            })
            .expect(200)

        expect(loginUser.body.accessToken).toEqual(expect.any(String))
        expect(loginUser.headers['set-cookie']).toBeDefined()
        expect(loginUser.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
        console.log(loginUser.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])

    }, 50000)
})

// describe('post', () => {
//
//     beforeAll(async () => {
//         // await runDb()
//         await request(app).delete('/testing/all-data').expect(204)
//     })
//
//     it('This test should create a user and login it', async () => {
//         await request(app).delete('/testing/all-data').expect(204)
//
//         const createUser = await request(app)
//             .post("/users/create-user")
//             .set(auth, basic)
//             .send({
//                 login: "loginUser",
//                 password: "passwordUser",
//                 email: "emailUser@gmail.com"
//             })
//             .expect(201)
//
//         expect(createUser.body).toEqual({
//             "createdAt": expect.any(String),
//             "email": expect.any(String),
//             "id": expect.any(String),
//             "login": expect.any(String)
//         })
//
//         const loginUser = await request(app)
//             .post("/authentication/login")
//             .send({
//                 loginOrEmail: "emailUser@gmail.com",
//                 password: "passwordUser"
//             })
//             .expect(200)
//
//         expect(loginUser.body.accessToken).toEqual(expect.any(String))
//         expect(loginUser.headers['set-cookie']).toBeDefined()
//         expect(loginUser.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
//         console.log(loginUser.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])
//
//     }, 20000)
//
//
//     it('should create send new pair of token', async () => {
//         await request(app).delete('/testing/all-data').expect(204)
//
//         const createUser = await request(app)
//             .post("/users")
//             .set(auth, basic)
//             .send({
//                 login: "login222",
//                 password: "password222",
//                 email: "simsbury65@gmail.com"
//             })
//             .expect(201)
//
//         expect(createUser.body).toEqual({
//             "createdAt": expect.any(String),
//             "email": "simsbury65@gmail.com",
//             "id": expect.any(String),
//             "login": "login222"
//         })
//
//         const login = await request(app)
//             .post("/auth/login")
//             .send({
//                 loginOrEmail: "simsbury65@gmail.com",
//                 password: "password222"
//             })
//             .expect(200)
//
//         expect(login.body.accessToken).toEqual(expect.any(String))
//         expect(login.headers['set-cookie']).toBeDefined()
//         expect(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
//         console.log(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])
//
//         const token = login.headers['set-cookie'];
//
//         const refreshTokenByUser = await request(app)
//             .post("/auth/refresh-token")
//             //.set('Cookie', 'refreshToken=213123123123')
//             .set('Cookie', `${token}`)
//
//         expect(refreshTokenByUser.body.accessToken).toEqual(expect.any(String))
//         expect(refreshTokenByUser.headers['set-cookie']).toBeDefined()
//         expect(refreshTokenByUser.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
//
//     }, 10000)
//
//     it('should logout user', async () => {
//         await request(app).delete('/testing/all-data').expect(204)
//
//         const createUser = await request(app)
//             .post("/users")
//             .set(auth, basic)
//             .send({
//                 login: "login222",
//                 password: "password222",
//                 email: "simsbury65@gmail.com"
//             })
//             .expect(201)
//
//         expect(createUser.body).toEqual({
//             "createdAt": expect.any(String),
//             "email": "simsbury65@gmail.com",
//             "id": expect.any(String),
//             "login": "login222"
//         })
//
//         const login = await request(app)
//             .post("/auth/login")
//             .send({
//                 loginOrEmail: "simsbury65@gmail.com",
//                 password: "password222"
//             })
//             .expect(200)
//
//         expect(login.body.accessToken).toEqual(expect.any(String))
//         expect(login.headers['set-cookie']).toBeDefined()
//         expect(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
//         console.log(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])
//
//         const token = login.headers['set-cookie'];
//
//         const logoutUser = await request(app)
//             .post("/auth/logout")
//             .set('Cookie', `${token}`)
//             .expect(204)
//
//
//         expect(logoutUser.headers['set-cookie']).toBeUndefined()
//
//     }, 10000)
// })
//
//     describe('registration', () => {
//
//         beforeAll(async () => {
//             // await runDb()
//             await request(app).delete('/testing/all-data').expect(204)
//         })
//
//         it('should send email and finish registration', async () => {
//             await request(app).delete('/testing/all-data').expect(204)
//
//             const createUser = await request(app)
//                 .post("/auth/registration")
//                 .send({
//                     login: "login222",
//                     password: "password222",
//                     email: "pav.murashckin@yandex.ru"
//                 })
//                 .expect(204)
//
//         }, 10000)
//
//         it('should resend code to email ', async () => {
//             await request(app).delete('/testing/all-data').expect(204)
//
//             const createUser = await request(app)
//                 .post("/auth/registration")
//                 .send({
//                     login: "login222",
//                     password: "password222",
//                     email: "pav.murashckin@yandex.ru"
//                 })
//                 .expect(204)
//
//             const resendCode = await request(app)
//                 .post("/auth/registration-email-resending")
//                 .send({
//                     email: "pav.murashckin@yandex.ru"
//                 })
//                 .expect(204)
//
//         }, 10000)
//
//         it('should send code to email and conrirmed code ', async () => {
//             await request(app).delete('/testing/all-data').expect(204)
//
//             const createUser = await request(app)
//                 .post("/auth/registration")
//                 .send({
//                     "login": "login222",
//                     "password": "password222",
//                     "email": "pav.murashckin@yandex.ru",
//                     "code": "111222333444"
//                 })
//                 .expect(204)
//
//             const code = createUser.body.code
//
//             const confirmCode = await request(app)
//                 .post("/auth/registration-confirmation")
//                 .send({
//                     "code": `${code}`
//                 })
//                 .expect(204)
//
//             // const resendCode = await request(app)
//             //     .post("/auth/registration-email-resending")
//             //     .send({
//             //         email: "pav.murashckin@yandex.ru"
//             //     })
//             //     .expect(204)
//
//
//         }, 10000)
//
//         it('should send code to email and should`nt conrirmed code ', async () => {
//             await request(app).delete('/testing/all-data').expect(204)
//
//             const createUser = await request(app)
//                 .post("/auth/registration")
//                 .send({
//                     "login": "login222",
//                     "password": "password222",
//                     "email": "pav.murashckin@yandex.ru",
//                     "code": "111222333444"
//                 })
//                 .expect(204)
//
//             const code = createUser.body.code
//
//             const confirmCode = await request(app)
//                 .post("/auth/registration-confirmation")
//                 .send({
//                     "code": `${code}`
//                 })
//                 .expect(400)
//
//             // const resendCode = await request(app)
//             //     .post("/auth/registration-email-resending")
//             //     .send({
//             //         email: "pav.murashckin@yandex.ru"
//             //     })
//             //     .expect(204)
//
//
//         }, 10000)
//     })







