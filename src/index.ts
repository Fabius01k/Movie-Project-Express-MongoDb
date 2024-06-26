import {runDb} from "./db/db";
import app from "./app";




const port = process.env.PORT || 3300

const startApp = async () => {
    await runDb()
    app.set('trust proxy', true)
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()



