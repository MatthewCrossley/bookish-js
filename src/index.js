import express from "express"
import { getBooks } from "./library.js"

const app = express()
const port = 3000

app.use(express.static("frontend"))

app.get('/books', async (req, res) => {
    res.send(await getBooks())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
