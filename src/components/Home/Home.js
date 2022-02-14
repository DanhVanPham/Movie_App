import React, { useCallback, useEffect, useState } from "react";
import Paginate from "../Paginate/Paginate";
import styles from "./Home.module.css";
import { getPopularMovies } from "../../api/movies";
import MovieCard from "../MovieCard/MovieCard";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreMovieLoading, setIsMoreMovieLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchPopularMovies = (page) => {
    setIsMoreMovieLoading(true);
    getPopularMovies(page).then((res) => {
      setIsDataLoaded(true);
      setIsMoreMovieLoading(false);
      if (!res) return;
      console.log(res);
      if (page === 1) {
        setTotalPages(res.total_pages);
        setPopularMovies(res.results);
      } else {
        setPopularMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const handlePaginate = useCallback(() => {
    if (isMoreMovieLoading || currentPage >= totalPages) return;
    fetchPopularMovies(currentPage + 1);
  }, [currentPage, isMoreMovieLoading, totalPages]);

  useEffect(() => {
    if (isNearEnd) {
      handlePaginate();
    }
  }, [isNearEnd, handlePaginate]);

  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  return (
    <div className={styles.container}>
      {!isDataLoaded ? (
        "Loading..."
      ) : (
        <Paginate
          onIntersected={(isOnEnd) => {
            setIsNearEnd(isOnEnd);
          }}
        >
          <div className={styles.innerContainer}>
            {popularMovies.map((movie) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
          </div>
          {isMoreMovieLoading && (
            <div className={styles.loading}>
              <b>Loading...</b>
            </div>
          )}
        </Paginate>
      )}
    </div>
  );
}

export default Home;
