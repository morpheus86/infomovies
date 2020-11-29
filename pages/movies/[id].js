"use strict";
import Layout from "../../components/Layout";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

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

  const thumbsUp = useStoreState((state) => state.like.thumbsUp);
  const thumbsDown = useStoreState((state) => state.like.thumbsDown);
  const setThumbsUp = useStoreActions((actions) => actions.like.setThumbsUp);
  const setThumbsDown = useStoreActions(
    (actions) => actions.like.setThumbsDown
  );

  useEffect(async () => {
    const get = async () => {
      const movieId = props.movie.id;
      const getRating = await axios.get(`/api/movie/rating/${movieId}`);

      const cookie = getRating.data.cookie;
      let token = window.sessionStorage.getItem("cookie");
      if (!token) {
        window.sessionStorage.setItem("cookie", cookie);
      }
      if (!getRating.data.getMovie[0]) {
        setThumbsUp(0);
        setThumbsDown(0);
      } else {
        setThumbsUp(getRating.data.getMovie[0].thumbsup);
        setThumbsDown(getRating.data.getMovie[0].thumbsdown);
      }
    };
    get();
  }, [movie, thumbsUp, thumbsDown]);
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
                        <a
                          href="#"
                          aria-label="Thumbs-up"
                          onClick={async (e) => {
                            try {
                              e.preventDefault();
                              const cookie = window.sessionStorage.getItem(
                                "cookie"
                              );
                              const like = await axios.post(
                                "http://localhost:3000/api/movie/like",
                                {
                                  cookie,
                                  id: props.movie.id,
                                  title: props.movie.originalTitle,
                                }
                              );
                              setThumbsUp(like.data.thumbsup);
                              console.log("data", like);
                            } catch (error) {
                              console.log("error", error);
                            }
                          }}
                        >
                          <i className="fas fa-thumbs-up fa-2x">{thumbsUp}</i>
                        </a>
                      </div>
                      <div>
                        <a
                          href="#"
                          aria-label="Thumbs-down"
                          onClick={async (e) => {
                            try {
                              e.preventDefault();
                              const cookie = window.sessionStorage.getItem(
                                "cookie"
                              );
                              const disLike = await axios.post(
                                "http://localhost:3000/api/movie/dislike",
                                {
                                  cookie,
                                  id: props.movie.id,
                                  title: props.movie.originalTitle,
                                }
                              );

                              setThumbsDown(disLike.data.thumbsdown);
                            } catch (error) {
                              console.log("error", error);
                            }
                          }}
                        >
                          <i className="fas fa-thumbs-down fa-2x">
                            {thumbsDown}
                          </i>
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
