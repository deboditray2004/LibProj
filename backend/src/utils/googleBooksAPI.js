import { ApiError } from "./ApiError.js"
export const searchGlobalBook = async (isbn) => {
    try {
        const queryStr = `isbn:${encodeURIComponent(isbn)}`
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryStr}&maxResults=1&key=${apiKey}`)
        if (!response.ok) throw new Error("Failed to search Google Books")
        const data = await response.json()
        if (!data.items || data.items.length === 0) {
            return null
        }
        
        const match = data.items[0]
        
        let foundIsbn = isbn
        if (match.volumeInfo.industryIdentifiers) {
            const isbn13 = match.volumeInfo.industryIdentifiers.find((i) => i.type === "ISBN_13")
            const isbn10 = match.volumeInfo.industryIdentifiers.find((i) => i.type === "ISBN_10")
            
            const cleanInput = isbn.replace(/-/g, '').toUpperCase()
            const hasIsbn13 = isbn13 && isbn13.identifier.toUpperCase() === cleanInput
            const hasIsbn10 = isbn10 && isbn10.identifier.toUpperCase() === cleanInput

            if (hasIsbn13) foundIsbn = isbn13.identifier
            else if (hasIsbn10) foundIsbn = isbn10.identifier
            else if (isbn13) foundIsbn = isbn13.identifier
            else if (isbn10) foundIsbn = isbn10.identifier
        }

        const categories = match.volumeInfo.categories || ["General"]

        return {
            globalBookId: foundIsbn,
            orderTitle: match.volumeInfo.title,
            authors: match.volumeInfo.authors || [],
            category: categories.slice(0, 3),
            coverImg: match.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || ""
        }
    } catch (error) {
        throw new ApiError(500, "Error searching global catalogue", error)
    }
}