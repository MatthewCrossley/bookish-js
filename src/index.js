import express from "express"
import connection from './connect.js'

const app = express()
const port = 3000

app.use(express.static("frontend"))

app.get('/books', async (req, res) => {
    let sql = await connection();
    const result = await sql.query("select * from books")
    res.send(result)
    // console.log("kjcbeiucbwqeicvoycb")
    // res.send("nothing yet")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
