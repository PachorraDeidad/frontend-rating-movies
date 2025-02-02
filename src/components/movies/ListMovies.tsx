import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css';
import { Movie } from '../../types/movie';

interface SlideShowProps {
  listMovies: Movie[];
}

const SlideShow = ({ listMovies }: SlideShowProps) => {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        slidesPerView={6}  // Muestra 6 elementos a la vez
        spaceBetween={15}  // Espacio entre las imágenes
        slidesPerGroup={3} // Avance de un slide por vez
        loop={true} // Carrusel infinito
        centeredSlides={true} // Centrado de los slides
        navigation // Habilitar navegación con flechas
        modules={[Pagination, Navigation]} // Usar los módulos de navegación y paginación
      >
        {listMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="text-center text-white">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[350px] object-contain rounded-lg shadow-md"
            />
            <h3 className="mt-2 text-lg">{movie.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideShow;
