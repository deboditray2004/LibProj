import { Book } from "../models/book.model.js"

export const cleanIsbn = (isbn) => {
    if (!isbn) return ''
    return isbn.replace(/^ISBN:\s*/i, '').replace(/-/g, '').trim()
}

export const findBookByIsbn = async (isbn) => {
    if (!isbn) return null
    let book = await Book.findOne({ globalBookId: isbn })
    if (!book) {
        const cleaned = cleanIsbn(isbn)
        book = await Book.findOne({ globalBookId: { $regex: new RegExp(`^${cleaned}$`, "i") } })
    }
    return book
}
