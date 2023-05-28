import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {blogsRouter} from "./routes/blogs-router";
import {collections, db, runDb} from "./db/db";
import {postsRouter} from "./routes/post-router";
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth-router";



export const app = express()
const port = 3000
app.use(express.json())


app.delete('/testing/all-data', async(req: Request, res: Response) => {
    const promises = collections.map(c => c.deleteMany())
    await Promise.all(promises)
    res.sendStatus(204)
})

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth',authRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()



