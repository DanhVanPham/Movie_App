import React, { useCallback, useEffect, useState } from "react";
import { getGenre, getMovieWithGenreId } from "../../api/movies";
import MovieCard from "../MovieCard/MovieCard";
import Paginate from "../Paginate/Paginate";
import styles from "./Explore.module.css";

function Explore() {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreMovieLoading, setIsMoreMovieLoading] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchAllGenres = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenres(res.genres);
      res.genres &&
        res.genres.length > 0 &&
        setSelectedGenres([...selectedGenres, res.genres[0]]);
    });
  };
  useEffect(() => {
    fetchAllGenres();
  }, []);

  const handleGenreSelected = (genre) => {
    let temp = [...selectedGenres];
    let genre_Index = temp.findIndex((item) => item.id === genre.id);
    if (genre_Index === -1) {
      temp.push(genre);
    } else {
      if (genre_Index > 0) temp.splice(genre_Index, 1);
    }
    setSelectedGenres(temp);
  };

  const handleSearchByGenreSelected = (page) => {
    if (selectedGenres.length === 0) return;
    let ids = "";
    selectedGenres.forEach((genre) => {
      ids += genre.id + ",";
    });
    setIsMoreMovieLoading(true);
    getMovieWithGenreId(ids, page).then((res) => {
      setIsMoreMovieLoading(false);
      if (!res) return;
      if (page === 1) {
        setTotalPages(res.total_pages);
        setGenreMovies(res.results);
      } else {
        setGenreMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
    console.log(genreMovies);
  };

  const handlePaginate = useCallback(() => {
    if (isMoreMovieLoading || currentPage >= totalPages) return;
    handleSearchByGenreSelected(currentPage + 1);
  }, [currentPage, isMoreMovieLoading, totalPages]);

  useEffect(() => {
    if (isNearEnd) {
      handlePaginate();
    }
  }, [isNearEnd]);

  useEffect(() => {
    setCurrentPage(1);
    handleSearchByGenreSelected(1);
  }, [selectedGenres]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {allGenres &&
          allGenres.length > 0 &&
          allGenres.map((genre) => {
            return (
              <div
                className={`${styles.chip} ${
                  selectedGenres &&
                  selectedGenres.some((item) => {
                    return JSON.stringify(item) === JSON.stringify(genre);
                  })
                    ? styles.activeChip
                    : ""
                }`}
                key={genre.id}
                onClick={() => handleGenreSelected(genre)}
              >
                {genre.name}
              </div>
            );
          })}
      </div>
      <p className={styles.title}>Explore Movies</p>
      <Paginate
        onIntersected={(isOnEnd) => {
          setIsNearEnd(isOnEnd);
        }}
      >
        <div className={styles.body}>
          {genreMovies.map((movie, index) => (
            <MovieCard key={movie?.id + "" + index} movie={movie} />
          ))}
        </div>
        {isMoreMovieLoading && (
          <div className={styles.loading}>
            <b>Loading...</b>
          </div>
        )}
      </Paginate>
    </div>
  );
}

export default Explore;
