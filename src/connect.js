import sql from "mssql"

export async function connection() {
    let conf = {
        server: "127.0.0.1",
        user: "sa",
        password: "pi",
        database: "bookish",
        options: {
            trustServerCertificate: true
        }
    }
    return sql.connect(conf)
}

export default async function query(string) {
    let sql = await connection();
    return sql.query(string);
}