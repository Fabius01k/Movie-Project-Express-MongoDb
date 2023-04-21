import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {blogsRouter} from "./routes/blogs-router";
import {db, runDb} from "./db/db";
import {postsRouter} from "./routes/post-router";
import {log} from "util";


export const app = express()
const port = 3000
app.use(express.json())


app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = []
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

const startApp = async () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    runDb()



}
startApp()



