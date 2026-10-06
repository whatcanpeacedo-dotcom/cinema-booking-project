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
import {searchMovies} from "../utils/tmdb";
import MovieCard from "../components/MovieCard";

       function SearchPage(){
       
              const [search, setSearch]  = useState("");
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
       <div className="min-h-screen bg-gray-940 p-6">
             
              <h1 className="text-3xl font-bold text-red-500 mb-6">Search Movies</h1>

              <input
              type = "text"
              value = {search}
              onChange = {(e) => setSearch(e.target.value)}
              placeholder = "search for a movie"
              className = " max-w-xl p-3 rounded-lg bg-white border-2 border-black-400 text-black mb-4"
              />

              <button onClick = {handleSearch} className="bg-red-600 text-white px-4 py-3 rounded">Search</button>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                     {movies.map((movie) => (
                            <MovieCard 
                                   key = {movie.id} 
                                   movie = {movie} 
                            />
                     ))}
              </div>
       </div>
    );
}
export default SearchPage; 