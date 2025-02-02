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
    <div className="mt-8 ">

      <SlideShow listMovies = {movies}/>
w
    </div>
  );
}

export default Home;
