// <route>: /

//Header
//Popular movies from TMDB
//Movie card(s)

import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { getPopularMovies } from "../utils/tmdb";
import MovieCard from "../components/MovieCard";

function HomePage() {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

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
        <div className="min-h-screen bg-gray-950 p-3 sm:p-6">
           
            <div className="max-w-6xl mx-auto">
               
                <h1 className="text-2xl sm:text-5xl font-bold text-red-500 mb-4 sm:mb-6 text-center">
                    Popular Movies
                </h1>

                <div className="mb-4 flex gap-2 justify-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for a movie"
                        className="p-3 rounded-lg bg-white text-black w-full max-w-xl text-sm sm:text-base"
                    />

                    <button
                        onClick={() => navigate(`/search?query=${search}`)}
                        className="bg-red-600 text-white px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base"
                    >
                        Search
                    </button>
                </div>

                <div className="mb-3 flex justify-center gap-1">

                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="p-2 text-black bg-white rounded-lg text-xs"
                    >
                        <option value="">All Genres</option>
                        <option value="28">Action</option>
                        <option value="35">Comedy</option>
                        <option value="27">Horror</option>
                        <option value="10749">Romance</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="p-2 text-black bg-white rounded-lg text-xs w-20"
                    />

                    <input
                        type="number"
                        placeholder="Min Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="p-2 text-black bg-white rounded-lg text-xs w-20"
                    />

                </div>
             

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">

                    {movies.filter(filterMovies).map((movie) => (

                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />

                    ))}

                </div>

           </div>
           
        </div>
    );
}

export default HomePage;




