import { Movie } from "../types/movie";
import api from "../utils/network";

export const getMovies = async () => {
    return await fetchMovies()
}

const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get<Movie[]>('/movie')
    return response.data 
  } catch (error) {
    console.error(error)
    return []
  }
}
