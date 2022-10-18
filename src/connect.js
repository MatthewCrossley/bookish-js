import sql from "mssql"

export default async function connection() {
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