/* MovieCard.jsx

Reusable movie display.

Used by:

Home
Search
Recommendations */
import {Link} from "react-router-dom";
import {useState} from "react";

function MovieCard({ movie }) {
    const [favorite, setFavorite] = useState(
        localStorage.getItem(`favorite-${movie.id}`) === "true"
    );
    return (
        <div className="bg-black-900 rounded-lg overflow-hidden">
            <Link to = {`/movie/${movie.id}`}>

            <img 
                className="w-full h-72 object-cover"
                src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt = {movie.title}
                loading = "lazy"
            />
            <h2 className="text-white text-md font-bold p-3">{movie.title}</h2>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setFavorite(!favorite);
                    localStorage.setItem(`favorite-${movie.id}`, !favorite);
                }}
                className="bg-yellow-400 text-black px-3 py-2 m-3 rounded">
                {favorite ? "★ Favorite" : "☆ Add Favorite"}
            </button>

            </Link>
        </div>
    );
}
export default MovieCard;