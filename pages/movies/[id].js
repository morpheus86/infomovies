"use strict";
import Layout from "../../components/Layout";
import Head from "next/head";
import fetch from "isomorphic-unfetch";

const TMDB_IMAGE_BASE_URL = (width = 300) =>
  `https://image.tmdb.org/t/p/w${width}`;
const updateMoviePictureUrls = (movieResult, width = 300) => ({
  ...movieResult,
  backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.backdropPath}`,
  poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.posterPath}`,
});
const filterJob = (datas, job) => {
  let name = [];
  for (let data of datas) {
    if (data.job === job) {
      name.push(data.name);
    }
  }
  return name;
};
const Movie = (props) => {
  const movie = updateMoviePictureUrls(props.movie);

  const { crews } = props;
  const director = filterJob(crews, "Director");

  const assistant_director = filterJob(crews, "Assistant Director")
    .map((ad) => {
      return ad;
    })
    .join(", ");

  const productions = movie.productionCompanies
    .map((company) => company.name)
    .join(", ");
  return (
    <Layout
      content={
        <section id="movie-page">
          <div className="container">
            <div className="page-container">
              <Head>
                <title>{movie.originalTitle}</title>
              </Head>
              <article className="card">
                <div className="card-content">
                  <div className="pic">
                    <img src={movie.backdrop_path} alt="" />
                    <div className="thumbs">
                      <div>
                        <a href="#" aria-label="Thumbs-up" target="_blank">
                          <i className="fas fa-thumbs-up fa-2x"></i>
                        </a>
                      </div>
                      <div>
                        <a href="#" aria-label="Thumbs-down" target="_blank">
                          <i className="fas fa-thumbs-down fa-2x"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="more_infos">
                    <div className="more_info">
                      <h2>Directors & Assistant Directors</h2>
                      <ul>
                        <li>Director: {director.join(", ")}</li>
                        <li>Assistant Director: {assistant_director}</li>
                      </ul>
                    </div>
                    <div className="more_info">
                      <h2>Productions</h2>
                      <ul>
                        <li>Productions: {productions}</li>
                      </ul>
                    </div>
                    <div className="more_info">
                      <h2>Release Date</h2>
                      <ul>
                        <li>Release Date: {movie.releaseDate}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
              <aside>
                <h3>{movie.originalTitle}</h3>
                <p>{movie.overview}</p>
              </aside>
            </div>
          </div>
        </section>
      }
    />
  );
};

Movie.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`http://localhost:3000/api/movies/${id}`);
  const movie = await response.json();

  return {
    movie: movie.getMovie,
    crews: movie.getMovieCrewCredits,
  };
};
export default Movie;
