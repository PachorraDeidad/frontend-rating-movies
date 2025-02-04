import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';

interface SlideShowProps {
  listMovies: Movie[];
}

const SlideShow = ({ listMovies }: SlideShowProps) => {
  return (
    <div className="w-full overflow-x-hidden">
      <Swiper
        slidesPerView={5.8}
        spaceBetween={15}
        slidesPerGroup={3}
        loop={true}
        centeredSlides={true}
        navigation
        modules={[Pagination, Navigation]}
      >
        {listMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="text-center text-white">
            <div className="cursor-pointer">
              <Link to={`/movie/${movie.id}`} className="block">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-contain rounded-lg shadow-md"
                  style={{ backgroundColor: "transparent" }}
                />
                <h3 className="pl-5 text-left mt-2 text-lg">{movie.title}</h3>
                <div className="flex justify-between pl-5 pr-5">
                  <p>{movie.vote_average}</p>
                  <p className="text-end pl-5 text-sm text-gray-400">{movie.release_date}</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideShow;
