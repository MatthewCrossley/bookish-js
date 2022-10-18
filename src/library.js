import connection from "./connect.js"

export async function getBooks(){
    const sql = await connection()

    const result = await sql.query("select * from books")

    return result["recordset"]
}