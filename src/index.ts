import {runDb} from "./db/db";
import app from "./app";


const port = 3000


const startApp = async () => {
    await runDb()
    app.set('trust proxy', true)
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()



