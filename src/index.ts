import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";

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

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.sendStatus(204)
})



app.use('/videos',videosRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
