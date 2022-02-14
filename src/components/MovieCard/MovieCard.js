import React from "react";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard(props) {
  const movie = props?.movie;
  return (
    <Link
      to={`/movie/${movie?.id}`}
      target="_blank"
      className={styles.container}
    >
      <img
        src={`${process.env.REACT_APP_PREFIX_IMAGE_URL}${movie?.poster_path}`}
        alt={movie?.title}
        loading="lazy"
      />
      <p>{movie?.title}</p>
    </Link>
  );
}

export default MovieCard;
