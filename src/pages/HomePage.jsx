// <route>: /

//Header
//Popular movies from TMDB
//Movie card(s)

import { useEffect, useState } from "react";
import {getPopularMovies} from "../utils/tmdb";

function HomePage(){

    const [movies, setMovies] = useState([]);

    useEffect(() => {
       async function fetchMovies() {
        const data = await getPopularMovies();
        setMovies(data.results);
       }
    fetchMovies();  
}, []);

    return (
        <div>
            <h1>Popular Movies</h1>

            {movies.map((movie) => (
                <div key = {movie.id}>
                    <img 
                        src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt = {movie.title}
                        width = {"200"}
                    />
                    <h2>{movie.title}</h2>
                 </div>

            ))}
        </div>
    );

}
export default HomePage;

