import axios from "axios";

const API_KEY = "8176c919cc0859719aa6fad88a46f520";

export default class MovieService {
  getMoviesById(id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
  }

  getPopulerMovies() {
    return axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
  }

  getSimiliarMovies(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1
    `);
  }

  getTopRatedMovies() {
    return axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
  }
  getUpComingMovies() {
    return axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
  }

  getRecommendations(id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );
  }
  getDiscoverMovies() {
    return axios.get(`
    https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
  }

  getMovieActor(id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
  }

  getMovieReviews(id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );
  }

  getMovieKeywords(id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${API_KEY}`
    );
  }

  getMovieByKeywordId(id) {
    return axios.get(
      `https://api.themoviedb.org/3/keyword/${id}/movies?api_key=${API_KEY}&language=en-US&include_adult=false`
    );
  }
}
