import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../../services/getMovieById';
import { Movie } from '../../types/movie';

function MovieId() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const errorMovieNotFound = () => {
    console.log('movie not found');
  };

  const movieId = id ? Number(id) : null;

  useEffect(() => {
    const fetchMovie = async () => {
      if (movieId) {
        const response = await getMovieById(movieId);
        if (response) {
          setMovie(response);
          console.log(response)
        } else {
          errorMovieNotFound();
        }
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (!movie) {
    return <div className='text-white'>Loading...</div>;
  }



  return (
<div className='flex justify-center items-center relative top-15'>
  <div className='bg-[#161616] w-3/5 h-[600px] relative z-0 flex gap-10 rounded-2xl'>
    
    <img 
      className='bg-neutral-800 m-8 h-[542px] w-[380px] z-20 relative'
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  
      alt="Poster"
    />

    <div className='relative top-[32px] z-20 w-[420px] h-[480px] text-white p-4 bg-black flex flex-col'>
      <div className='z-40 absolute group -left-1 -top-4'>
        <button className="group cursor-pointer p-2 rounded relative">
          <svg className="icon icon-tabler icons-tabler-filled icon-tabler-backspace absolute inset-0 group-hover:opacity-0 transition-opacity"xmlns="http://www.w3.org/2000/svg"width="30"height="30"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" /><path d="M12 10l4 4m0 -4l-4 4" /></svg>
          <svg className="icon icon-tabler icons-tabler-outline icon-tabler-backspace absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"xmlns="http://www.w3.org/2000/svg"width="30"height="30"viewBox="0 0 24 24"fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 5a2 2 0 0 1 1.995 1.85l.005 .15v10a2 2 0 0 1 -1.85 1.995l-.15 .005h-11a1 1 0 0 1 -.608 -.206l-.1 -.087l-5.037 -5.04c-.809 -.904 -.847 -2.25 -.083 -3.23l.12 -.144l5 -5a1 1 0 0 1 .577 -.284l.131 -.009h11zm-7.489 4.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083l-.102 -.07z" /></svg>
        </button>
      </div>
      <div className="text-[#f3f3fc] w-full flex justify-center font-extrabold text-4xl relative m-0 text-center">
        <h1>{movie.title}</h1>
        <span 
          className="w-4/5 h-[7px] bg-gradient-to-r from-[#0c0c0c] to-[#dddddd] absolute -bottom-5 
          bg-[length:200%_100%] animate-[gradientMove_2s_linear_infinite]"
          />
      </div>
      <div className='relative w-5/6 h-20 mt-7 left-1/2 -translate-x-1/2'>
        <div className='text-[#dededf] flex justify-between p-3 absolute top-1 w-full font-bold text-xl'>
          <h4>0</h4>
          <h4>10</h4>
        </div>

          <div className="absolute z-31 bottom-6 right-0 h-1 bg-neutral-800"
            style={{ width: `${(10-movie.vote_average) * 10}%` }}
          />
          <div 
            className="z-30 absolute bottom-6 left-0 h-1 w-full bg-gradient-to-r from-[#ff0000] to-[#04ff10]" 
          />
          <div className='absolute bottom-0'
            style={{ right: `${(10-movie.vote_average) * 10}%` }}>
            {movie.vote_average}
          </div>
      </div>

      <div className='m-2 mt-0 p-5 text-[0.955rem] font-semibold'>
      {movie.overview}
      </div>
      <div className='m-2 mt-4 pl-5 text-[0.955rem] font-mono'>
        <h3>Release on {movie.release_date}</h3>
      </div>

      <div>
          { /* input para el usuario registrado */ }
      </div>

    </div>

  </div>
</div>




  );
}

export default MovieId;
/*    <div
      className="flex justify-center bg-cover bg-center w-7xl"
    >
      <div className=''>
        <h1>{movie.title}</h1>

      </div>
      <div
        style={{ backgroundImage: `url('')` }}>
        <p className="text-white w-[500px]">{movie.overview}</p>
        <p className="text-white">Genres: {movie.genres.join(', ')}</p>
      </div>
    </div>)*/
  