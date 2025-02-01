import  { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ListMovies from "../../components/movies/ListMovies";
import { getMovies } from "../../services/getAllMovies";
import { Movie } from "../../types/movie";
function Home(){

  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(()=>{
    getMovies().then(setMovies)
  },[])

  return (
    <div className=" w-screen h-screen bg-[#141517] relative">
        
      <Navbar/>
      <ListMovies Movies = {movies}/>

    </div>
  );
}

export default Home;
