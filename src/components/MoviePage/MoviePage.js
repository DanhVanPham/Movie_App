import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../../api/movies";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MoviePage.module.css";

function MoviePage() {
  const params = useParams();
  const movieId = params.movieId || "";
  const [movie, setMovie] = React.useState(null);
  const [similarMovie, setSimilarMovie] = React.useState([]);

  const fetchMovieDetailsById = () => {
    getMovieDetails(movieId).then((res) => {
      if (!res) return;
      console.log(res);
      setMovie(res);
    });
  };

  const fetchSimilarMovie = () => {
    getSimilarMovies(movieId).then((res) => {
      if (!res) return;
      console.log("SIMILAR:", res);
      setSimilarMovie(res.results);
    });
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetailsById();
      fetchSimilarMovie();
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img
          src={`${process.env.REACT_APP_PREFIX_IMAGE_URL}${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className={styles.details}>
          <label>Title</label>
          <div className={styles.title}>{movie?.title}</div>
          <div className={styles.subTitle}>{movie?.tagline}</div>
          <label>Story</label>
          <div className={styles.desc}>{movie?.overview}</div>
          <label>Run time</label>
          <div className={styles.desc}>{movie?.runtime} mins</div>
        </div>
      </div>
      <div className={styles.similar}>
        <div className={styles.title}>Similar movies</div>
        <div className={styles.movies}>
          {similarMovie &&
            similarMovie.length > 0 &&
            similarMovie.map((item, index) => (
              <MovieCard key={`${item.id}${index}`} movie={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
