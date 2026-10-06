// <route>: /

//Header
//Popular movies from TMDB
//Movie card(s)

import { useEffect, useState } from "react";
import { getPopularMovies } from "../utils/tmdb";
import MovieCard from "../components/MovieCard";

function HomePage() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {

        async function fetchMovies() {

            try {

                const data = await getPopularMovies();

                setMovies(data.results);
                setLoading(false);

            } catch (error) {

                setError("Failed to load movies");
                setLoading(false);

            }
        }

        fetchMovies();

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    function filterMovies(movie) {

        if (genre && !movie.genre_ids.includes(Number(genre))) {
            return false;
        }

        if (year && movie.release_date.substring(0, 4) !== year) {
            return false;
        }

        if (rating && movie.vote_average < Number(rating)) {
            return false;
        }

        return true;
    }

    return (
        <div className="min-h-screen bg-gray-950 p-6">

            <h1 className="text-3xl font-bold text-red-500 mb-6">
                Popular Movies
            </h1>

            <div className="mb-6">

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="p-2 mr-2 mb-2 text-black bg-white"
                >
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="35">Comedy</option>
                    <option value="27">Horror</option>
                    <option value="10749">Romance</option>
                </select>

                <input
                    type="number"
                    placeholder="Release Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="p-2 mr-2 mb-2 text-black bg-white"
                />

                <input
                    type="number"
                    placeholder="Minimum Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 mb-2 text-black bg-white"
                />

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {movies.filter(filterMovies).map((movie) => (

                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />

                ))}

            </div>

        </div>
    );
}

export default HomePage;




