import  { useEffect, useState } from "react";
import SlideShow from "../../components/movies/ListMovies";
import { getMovies } from "../../services/getAllMovies";
import { Movie } from "../../types/movie";
function Home(){

  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(()=>{
    getMovies().then(setMovies)
  },[])

  return (
    <div>
      <div>
        <h1 className="text-white text-4xl m-5">Our recommendations</h1>
      <SlideShow listMovies = {movies}/>
      </div>
    </div>
  );
}

export default Home;
