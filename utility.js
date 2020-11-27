"use strict";
const TMDB_IMAGE_BASE_URL = (width = 300) =>
  `https://image.tmdb.org/t/p/w${width}`;

const updateMoviePictureUrls = (movieResult, width = 300) => ({
  ...movieResult,
  backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.backdropPath}`,
  poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.posterPath}`,
});

const getMoviesList = (moviesResponse) => {
  return !!moviesResponse
    ? [
        ...moviesResponse.map((movieResult) =>
          updateMoviePictureUrls(movieResult)
        ),
      ]
    : null;
};

export default getMoviesList;
