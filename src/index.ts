import express, {Request, Response} from 'express'

export const app = express()
const port = 3000
app.use(express.json())

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

const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
const valuePublicationDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/



// get all videos
app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

//create new video
app.post('/videos', (req: Request, res: Response) => {
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions
    const errors = []

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            message: "invalid title",
            field: "title"
        })
    }

    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            message: "invalid author",
            field: "author"
        })
    }

    if (!availableResolutions || availableResolutions.length > valueAvailableResolutions.length) {
        errors.push({
            message: "invalid availableResolutions",
            field: "availableResolutions"

        })

    }

    if (availableResolutions !== undefined && availableResolutions !== null) {
        const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
        for (let i = 0; i < availableResolutions.length; i++) {
            if (!valueAvailableResolutions.includes(availableResolutions[i])) {
                errors.push({
                    message: "invalid title",
                    field: "availableResolutions"

                });
                break;

            }
        }
    }
    if (errors.length > 0) {
        res.status(400).send({errorsMessages: errors})
        return
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
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    if (video) {
        res.status(200).send(video)
    } else {
        res.status(404)
    }
})

app.put('/videos/:id', (req: Request, res: Response) => {
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions
    const canBeDownloaded = req.body.canBeDownloaded
    const minAgeRestriction = req.body.minAgeRestriction
    const publicationDate = req.body.publicationDate
    const errors = []


    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            message: "invalid title",
            field: "title"
        })

    }

    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            message: "invalid author",
            field: "author"
        })

    }

    if (!availableResolutions || availableResolutions.length > valueAvailableResolutions.length) {
        errors.push({
            message: "invalid availableResolutions",
            field: "availableResolutions"

        })

    }
    if (availableResolutions !== undefined && availableResolutions !== null) {
        const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
        for (let i = 0; i < availableResolutions.length; i++) {
            if (!valueAvailableResolutions.includes(availableResolutions[i])) {
                errors.push({
                    message: "invalid title",
                    field: "availableResolutions"

                });
                break;

            }
        }
    }

    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        errors.push({
            message: "net",
            field: "canBeDownloaded"
        })
    }

    if(typeof minAgeRestriction !== "undefined"){
        if (!Number.isInteger(minAgeRestriction)) {
            errors.push({
                message: "minAgeRestriction must be an integer",
                field: "minAgeRestriction"
            })

            return;
        }

        if(minAgeRestriction < 1 || minAgeRestriction > 18) {
            errors.push({
                message: "minAgeRestriction must be greater than 1 and less than or equal to 18",
                field: "minAgeRestriction"
            })
        }
    }

    if(!valuePublicationDate.test(publicationDate)) {
        errors.push({
            message: "invalid date format",
            field: "publicationDate"
        })
    }




    if (errors.length > 0) {
        return res.status(400).send({errorsMessages: errors})

    }
    const id = +req.params.id
    const video = videos.find(v => v.id ===id)
    if (video) {

        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
        res.status(204).send(video)
    } else {
        res.status(404)
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
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
