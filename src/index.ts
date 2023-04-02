import express, {Request, Response} from 'express'

export const app = express()
const port = 3000

type TVideo = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: string[]
}

let videos: TVideo[] = []

let errors: any = []
let valueAvailableResolutions = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160", null ]

// get all videos
app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

//create new video
app.post('/videos', (req: Request, res: Response) => {
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            message: "invalid title",
            field: "title"
        })
    }

    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20 ) {
        errors.push({
            message: "invalid title",
            field: "author"
        })
    }

    if (!valueAvailableResolutions.includes(availableResolutions)) {
        errors.push({
            message: "invalid title",
            field: "availableResolutions"

        })

    }

    if (errors.length > 0) {
        return res.status(400).send({errorsMessages: errors})
    }


    const dateNow = new Date()
    const newVideo: TVideo = {
        id: +dateNow,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateNow.toISOString(),
        publicationDate: new Date(+dateNow + (1000 * 60 * 60 * 24)).toISOString(),
        availableResolutions: availableResolutions
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.get('/videos/:id', (req: Request, res: Response) => {
    const id = +req.body.id
    const video = videos.find(v => v.id === id)

    if (video) {
        res.status(200).send(video)
    } else {
        res.status(404)
    }
})

app.put('/videos', (req: Request, res: Response) => {
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions
    const errors = []
    const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160", null]
    // const publicationDate = req.body.publicationDate
    // const canBeDownloaded = req.body.canBeDownloaded


    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            message: "invalid title",
            field: "title"
        })

    }

    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            message: "invalid title",
            field: "author"
        })

    }

    if (!valueAvailableResolutions.includes(availableResolutions)) {
        errors.push({
            message: "invalid title",
            field: "availableResolutions"

        })

    }

    // if (publicationDate !== "2023-04-02T08:29:48.926Z" ) {
    // errors.push({
    // message: "invalid title",
    // field: "publicationDate"

    // })

    // }
    if (errors.length > 0) {
        return res.status(400).send({errorsMessages: errors})

    }
    const id = +req.body.id
    const video = videos.find(v => v.id === id)
    if (video) {

        video.title = req.body.title
        video.author = req.body.author
        res.status(204).send(video)
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
        const id = +req.body.id
        const newVideos = videos.filter(v => v.id !== id)
        if (newVideos.length < videos.length) {
            videos = newVideos
            res.status(204)
        } else {
            res.status(404)
        }
    })

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
        res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
