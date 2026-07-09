import { ApiError } from "./ApiError.js";

export const searchGlobalBook = async (title, author = "") => {
    try {
        let queryStr = `intitle:${encodeURIComponent(title)}`;
        if (author) {
            queryStr += `+inauthor:${encodeURIComponent(author)}`;
        }
        
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryStr}&maxResults=1`);
        
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
            coverImg: match.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || ""
        };
    } catch (error) {
        throw new ApiError(500, "Error searching global catalogue", error);
    }
};

export const fetchAndFormatBookData = async (globalBookId) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${globalBookId}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch from Google Books API");
        }

        const data = await response.json();
        const volumeInfo = data.volumeInfo;

        if (!volumeInfo) {
            throw new Error("Invalid book data received");
        }

        const formattedBook = {
            globalBookId: data.id,
            title: volumeInfo.title || "Unknown Title",
            authors: volumeInfo.authors || ["Unknown Author"],
            category: volumeInfo.categories || ["General"],
            coverImg: volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || "" 
        };

        return formattedBook;

    } catch (error) {
        throw new ApiError(500, "Error fetching/formatting global catalogue data", error);
    }
};
