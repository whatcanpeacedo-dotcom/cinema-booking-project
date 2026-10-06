/* Route: /movie/:id 
Movie Details
    poster 
    title 
    synopsis 
    rating 
    runtime 
    cast 
    recommendations 
    book/continue 
*/

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMovieDetails, getMovieCredits, getRecommendations} from "../utils/tmdb";
import {Link} from "react-router-dom";
import MovieCard from "../components/MovieCard";

function MovieDetailPage(){

    
    const {id} = useParams();

    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchMovie() {

            try {

                const data = await getMovieDetails(id);
                const creditData = await getMovieCredits(id);
                const recommendationData = await getRecommendations(id);

                setMovie(data);
                setCredits(creditData);
                setRecommendations(recommendationData.results);

            } catch (error) {

                setError("Failed to load movie details.");

            }
        }

        fetchMovie();

    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if(!movie) {
        return <p>Loading...</p>;
    }

    return(
        <div className="min-h-screen bg-gray-950 text-white p-6">

            <div className="max-w-5xl mx-auto">

                <div className="grid md:grid-cols-2 gap-8">

                    <img
                        className="w-full max-w-md rounded-lg shadow-lg"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div>

                        <h1 className="text-4xl font-bold text-red-500 mb-4">
                            {movie.title}
                        </h1>

                        <p className="text-gray-300 mb-6">
                            {movie.overview}
                        </p>

                        <div>

                            <p className="text-yellow-400 mb-2">
                                Rating: {movie.vote_average}/10
                            </p>

                            <p className="text-yellow-400">
                                ★★★★★
                            </p>

                        </div>

                        <p className="mb-6">
                            Runtime: {movie.runtime} minutes
                        </p>

                        <h2 className="text-2xl font-bold text-red-500 mb-3">
                            Cast
                        </h2>

                        {credits?.cast?.slice(0,5).map((actor) => (
                            <p key={actor.id} className="text-gray-300">
                                {actor.name}
                            </p>
                        ))}

                        <Link
                            to="/booking"
                            state={{movie}}
                        >
                            <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg">
                                Book Tickets
                            </button>
                        </Link>

                    </div>

                </div>

                <h2 className="text-2xl font-bold text-red-500 mt-10 mb-4">
                    Recommended Movies
                </h2>

                <div className="flex gap-4 overflow-x-auto">

                    {recommendations.map((movie) => (
                        <div key={movie.id} className="min-w-40">
                            <MovieCard movie={movie} />
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default MovieDetailPage;
