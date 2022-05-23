export async function getArticles(filter) {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENV_URL}/api/articles?${filter}`)
        return await response.json()
    } catch (error) {
        return []
    }
}

export async function getBooks(filter) {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENV_URL}/api/books?${filter}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

export async function getResourceLinks(filter) {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENV_URL}/api/resourceLinks?${filter}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

export async function getTutorials(filter) {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENV_URL}/api/tutorials?${filter}`)
        return await response.json()
    } catch (error) {
        return error
    }
}