import { Movie } from '../../types/movie'

interface Props{
  Movies:Movie[] 
}


const ListMovies=({Movies}:Props)=> {

  return (
    <div className='w-screen h-52'>

      <div className='flex text-white gap-3'>
        {
          Movies.map(movie=>{
            return (
              <div className= "relative pl-2 pr-2 pt-1 pb-2">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div>{movie.title}</div>
                <div className="w-full h-1 bg-slate-800 absolute bottom-0 left-0">
                  <div className="h-1 bg-red-700 absolute bottom-0 left-0"
                    style={{ width: `${movie.vote_average * 10}%` }}>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}
// pasar el estado de authTab a un context
export default ListMovies
