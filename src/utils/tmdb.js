const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = "https://api.themoviedb.org/3" 

export async function getPopularMovies() {

    const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`);
    const data = await response.json();

    return data;

}

