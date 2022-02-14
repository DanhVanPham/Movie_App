export const getPopularMovies = async (page = 1) => {
  try {
    console.log(process.env.REACT_APP_API_KEY);
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getGenre = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMovieImage = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMovieWithGenreId = async (id, page = 1) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}&sort_by=popularity.desc&page=${page}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const searchMovie = async (query) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
