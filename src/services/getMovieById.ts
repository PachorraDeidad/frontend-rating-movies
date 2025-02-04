import { Movie } from "../types/movie";
import api from "../utils/network";


export const getMovieById = async (id: number) => {
  return await fetchMovieById(id);
}

const fetchMovieById = async (id: number): Promise<Movie | undefined> => {
  try {
    const response = await api.get<Movie>(`/movie/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return
  }
}
