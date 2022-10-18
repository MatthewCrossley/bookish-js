import query from "./connect.js"

class Copy {
    constructor(id, bookId){
        this.copyId = id
        this.bookId = bookId
    }
}

class Book {
    constructor(id, title, author, isbn){
        this.bookId = id
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

export async function getBooks(bookId){
    var result
    if (bookId === undefined){
        result = await query("select * from books")
    } else {
        result = await query(`select * from Books where BookId=${bookId}`)
    }

    let books = []
    for (let record of result["recordset"]){
        books.push(new Book(record["BookId"], record["Title"], record["Author"], record["ISBN"]))
    }
    return books
}

export async function getCopies(bookId){
    const result = await query(`select CopyId from Copies where BookId=${bookId}`)
    let copies = []
    for (let record of result["recordset"]){
        copies.push(new Copy(record["CopyId"], bookId))
    }
    return copies
}