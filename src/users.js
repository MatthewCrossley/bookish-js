import query from "./connect.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

function response(statusMsg, jwt){
    return {
        "status": statusMsg,
        "token": jwt
    }
}

export async function createUser(user, passHash, salt){
    let currentUsers = await query(`select * from Users where Username='${user}'`)
    if (currentUsers.recordset.length > 0){
        return response("error: user exists", null)
    }
    let x = await query(`insert into Users ([Username], [Pass], [Salt]) values ('${user}', '${passHash}', '${salt}')`)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    return response("all good", accessToken)
}

export async function loginUser(user, passHash){
    const dbResult = await query(`select Pass from Users where Username='${user}'`)
    const dbUser = dbResult.recordset[0]
    if (dbUser.Pass === passHash){
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        return response("all good", accessToken)
    }
    return response("forbidden", null)
}

export function getSalt(u){
    return query(`select Salt from Users where Username='${u}'`).then(record => {
        return record.recordset[0].Salt
    })
}

export function authenticateRequest(req, res, next){
    if (req.query.token === undefined){
        return res.sendStatus(401)
    }
    jwt.verify(req.query.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return res.send(403)
        }
        req.user = user
        next()
    })
}