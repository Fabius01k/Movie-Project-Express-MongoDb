// @ts-ignore
import request from 'supertest'
import app from "../../src/app";
import mongoose from 'mongoose'

const auth = 'Authorization'
const basic = 'Basic YWRtaW46cXdlcnR5'

describe('post', () => {

    beforeAll(async () => {
        // await runDb()
        await request(app).delete('/testing/all-data').expect(204)
    })

    it('should create user and auth', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "login222",
                password: "password222",
                email: "simsbury65@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            "createdAt": expect.any(String),
            "email": "simsbury65@gmail.com",
            "id": expect.any(String),
            "login": "login222"
        })

        const res = await request(app)
            .post("/auth/login")
            // .set('Cookie', 'refreshToken=213123123123')
            .send({
                loginOrEmail: "simsbury65@gmail.com",
                password: "password222"
            })
            .expect(200)

        expect(res.body.accessToken).toEqual(expect.any(String))
        expect(res.headers['set-cookie']).toBeDefined()
        expect(res.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
        console.log(res.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])

    }, 10000)


    it('should create send new pair of token', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "login222",
                password: "password222",
                email: "simsbury65@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            "createdAt": expect.any(String),
            "email": "simsbury65@gmail.com",
            "id": expect.any(String),
            "login": "login222"
        })

        const login = await request(app)
            .post("/auth/login")
            .send({
                loginOrEmail: "simsbury65@gmail.com",
                password: "password222"
            })
            .expect(200)

        expect(login.body.accessToken).toEqual(expect.any(String))
        expect(login.headers['set-cookie']).toBeDefined()
        expect(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
        console.log(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])

        const token = login.headers['set-cookie'];

        const refreshTokenByUser = await request(app)
            .post("/auth/refresh-token")
            //.set('Cookie', 'refreshToken=213123123123')
            .set('Cookie', `${token}`)

        expect(refreshTokenByUser.body.accessToken).toEqual(expect.any(String))
        expect(refreshTokenByUser.headers['set-cookie']).toBeDefined()
        expect(refreshTokenByUser.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()

    }, 10000)

    it('should logout user', async () => {
        await request(app).delete('/testing/all-data').expect(204)

        const createUser = await request(app)
            .post("/users")
            .set(auth, basic)
            .send({
                login: "login222",
                password: "password222",
                email: "simsbury65@gmail.com"
            })
            .expect(201)

        expect(createUser.body).toEqual({
            "createdAt": expect.any(String),
            "email": "simsbury65@gmail.com",
            "id": expect.any(String),
            "login": "login222"
        })

        const login = await request(app)
            .post("/auth/login")
            .send({
                loginOrEmail: "simsbury65@gmail.com",
                password: "password222"
            })
            .expect(200)

        expect(login.body.accessToken).toEqual(expect.any(String))
        expect(login.headers['set-cookie']).toBeDefined()
        expect(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken'))).toBeDefined()
        console.log(login.headers['set-cookie'].find((el: string) => el.startsWith('refreshToken')).split(';')[0].split('=')[1])

        const token = login.headers['set-cookie'];

        const logoutUser = await request(app)
            .post("/auth/logout")
            .set('Cookie', `${token}`)
            .expect(204)


        expect(logoutUser.headers['set-cookie']).toBeUndefined()

    }, 10000)
})

    describe('registration', () => {

        beforeAll(async () => {
            // await runDb()
            await request(app).delete('/testing/all-data').expect(204)
        })

        it('should send email and finish registration', async () => {
            await request(app).delete('/testing/all-data').expect(204)

            const createUser = await request(app)
                .post("/auth/registration")
                .send({
                    login: "login222",
                    password: "password222",
                    email: "pav.murashckin@yandex.ru"
                })
                .expect(204)

        }, 10000)

        it('should resend code to email ', async () => {
            await request(app).delete('/testing/all-data').expect(204)

            const createUser = await request(app)
                .post("/auth/registration")
                .send({
                    login: "login222",
                    password: "password222",
                    email: "pav.murashckin@yandex.ru"
                })
                .expect(204)

            const resendCode = await request(app)
                .post("/auth/registration-email-resending")
                .send({
                    email: "pav.murashckin@yandex.ru"
                })
                .expect(204)

        }, 10000)

        it('should send code to email and conrirmed code ', async () => {
            await request(app).delete('/testing/all-data').expect(204)

            const createUser = await request(app)
                .post("/auth/registration")
                .send({
                    "login": "login222",
                    "password": "password222",
                    "email": "pav.murashckin@yandex.ru",
                    "code": "111222333444"
                })
                .expect(204)

            const code = createUser.body.code

            const confirmCode = await request(app)
                .post("/auth/registration-confirmation")
                .send({
                    "code": `${code}`
                })
                .expect(204)

            // const resendCode = await request(app)
            //     .post("/auth/registration-email-resending")
            //     .send({
            //         email: "pav.murashckin@yandex.ru"
            //     })
            //     .expect(204)


        }, 10000)

        it('should send code to email and should`nt conrirmed code ', async () => {
            await request(app).delete('/testing/all-data').expect(204)

            const createUser = await request(app)
                .post("/auth/registration")
                .send({
                    "login": "login222",
                    "password": "password222",
                    "email": "pav.murashckin@yandex.ru",
                    "code": "111222333444"
                })
                .expect(204)

            const code = createUser.body.code

            const confirmCode = await request(app)
                .post("/auth/registration-confirmation")
                .send({
                    "code": `${code}`
                })
                .expect(400)

            // const resendCode = await request(app)
            //     .post("/auth/registration-email-resending")
            //     .send({
            //         email: "pav.murashckin@yandex.ru"
            //     })
            //     .expect(204)


        }, 10000)
    })







