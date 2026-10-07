{/* <Route>: /search </Route>
search input
TMDB search
search results
movie cards 
 */}
 
/* 
 header 
 search bar 
 results 
        moviecard(s) */


import {useState, useEffect} from "react";
import {useSearchParams, Link} from "react-router-dom";
import {searchMovies} from "../utils/tmdb";
import MovieCard from "../components/MovieCard";

       function SearchPage(){

              const [searchParams] = useSearchParams();
              const [search, setSearch]  = useState(searchParams.get("query") || "");
              const [movies, setMovies] = useState ([]);
              const [loading, setLoading] = useState(false);
              const [error, setError] = useState("");

           async function handleSearch() {
              if (search === ""){
                     return;
              }
              setLoading(true);
              setError("");

              try{
              const data = await searchMovies(search);
              setMovies(data.results);
              setLoading(false);

              } catch (error) {
                     setError("Search Failed");
                     setLoading(false);
              }
            
           }

           useEffect(() => {
              const timer = setTimeout(() =>{
                     handleSearch();
              }, 1000);

              return () => clearTimeout(timer);
       }, [search]);
          
           if (loading) {
              return <p> Loading...</p>
           }

           if (error) {
              return <p>{error}</p>;
           }
    return (
       <div className="min-h-screen bg-gray-950 p-6">
             
              <div className="text-center">
              
                     <h1 className="text-3xl font-bold text-red-500 mb-6">Search Movies</h1>

                     <div className="flex justify-center gap-2">

                            <input
                            type = "text"
                            value = {search}
                            onChange = {(e) => setSearch(e.target.value)}
                            placeholder = "search for a movie"
                            className = "p-3 rounded-lg bg-white text-black w-full max-w-4xl"
                            />

                     </div>

              </div>  

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                     {movies.map((movie) => (
                            <MovieCard 
                                   key = {movie.id} 
                                   movie = {movie} 
                            />
                     ))}
              </div>

                      <Link to="/" className="inline-block mb-6 bg-red-600 text-white px-4 py-2 rounded-lg" >
                            Back to Home
                     </Link>

       </div>
    );
}
export default SearchPage; 