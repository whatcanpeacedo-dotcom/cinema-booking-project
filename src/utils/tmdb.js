const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";

export async function getPopularMovies() {

    const response = await fetch(
        `${apiUrl}/movie/popular?api_key=${apiKey}`
    );
    const data = await response.json();

    return data;

}

export async function searchMovies(query) {
    const response = await fetch(
        `${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();

    return data;
}

export async function getMovieDetails(id) {
    const response = await fetch(
        `${apiUrl}/movie/${id}?api_key=${apiKey}`
    );
    const data = await response.json();

    return data;
}

export async function getMovieCredits(id) {
    const response = await fetch(
        `${apiUrl}/movie/${id}/credits?api_key=${apiKey}`
    );
    const data = await response.json();

    return data;
}


export async function getRecommendations(id) {
    const response = await fetch(
        `${apiUrl}/movie/${id}/recommendations?api_key=${apiKey}`
    );

    const data = await response.json();

    return data;
}

