import express from "express"
import { getBooks } from "./library.js"
import { createUser } from "./users.js"

const app = express()
const port = 3000

app.use(express.static("frontend"))

app.get('/books', async (req, res) => {
    res.send(await getBooks())
})

app.get('/createUser', async(req, res) => {
    const u = req.query.u
    if (u === undefined || u === ""){
        res.send("invalid username")
        return
    }
    const ph = req.query.ph
    if (ph === undefined || ph === ""){
        res.send("invalid password")
        return
    }
    const s = req.query.s
    if (s === undefined || s === ""){
        res.send("invalid credentials")
        return
    }
    createUser(u, ph, s).then(
        res.send("all good")
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
