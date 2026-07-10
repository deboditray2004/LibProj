import { ApiError } from "./ApiError.js";

export const searchGlobalBook = async (isbn) => {
    try {
        const queryStr = `isbn:${encodeURIComponent(isbn)}`;
        
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryStr}&maxResults=1&key=${apiKey}`);
        
        if (!response.ok) throw new Error("Failed to search Google Books");
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            return null;
        }
        
        const match = data.items[0];
        return {
            globalBookId: match.id,
            orderTitle: match.volumeInfo.title,
            authors: match.volumeInfo.authors || [],
            category: match.volumeInfo.categories || ["General"],
            coverImg: match.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || ""
        };
    } catch (error) {
        throw new ApiError(500, "Error searching global catalogue", error);
    }
};


