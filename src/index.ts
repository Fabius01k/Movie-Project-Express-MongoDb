import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {blogsRouter} from "./routes/blogs-router";
import {db} from "./db/db";
import {postsRouter} from "./routes/post-router";

export const app = express()
const port = 3000
app.use(express.json())

//todo create new router
app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = []
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
