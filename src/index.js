import express from "express"
import { getBooks } from "./library.js"
import { getSalt, createUser, loginUser, authenticateRequest } from "./users.js"

const app = express()
const port = 3000

app.use(express.static("frontend"))

app.get('/books', async (req, res) => {
    res.send(await getBooks())
})

app.get('/createUser', async (req, res) => {
    const u = req.query.u
    if (u === undefined || u === ""){
        return res.send("invalid username")
    }
    const ph = req.query.ph
    if (ph === undefined || ph === ""){
        return res.send("invalid password")
    }
    const s = req.query.s
    if (s === undefined || s === ""){
        return res.send("invalid credentials")
    }
    createUser(u, ph, s).then(result =>
        res.json(result)
        // res.send(JSON.stringify(result))
    )
})

app.get('/loginUser', async(req, res) => {
    const u = req.query.u
    if (u === undefined){
        return res.send(403)
    }
    const ph = req.query.ph
    if (ph === undefined){
        return res.send(403)
    }
    loginUser(u, ph).then(response => res.json(response))
})

app.get('/userSalt', async (res, req) => {
    // no idea why req.req is nested like that?
    const user = req.req.query.u
    if (user === undefined || user === ""){
        return res.send("invalid user")
    }
    let salt = await getSalt(user)
    return res.res.send(salt)
})

app.get('/evilBooks', authenticateRequest, async (req, res) => {
    res.send('evil >:)')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
