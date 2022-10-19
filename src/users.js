import query from "./connect.js"

export async function createUser(user, passHash, salt){
    await query(`insert into Users ([Username], [Pass], [Salt]) values ('${user}', '${passHash}', '${salt}')`)
}