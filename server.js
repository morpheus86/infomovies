"use stict";
const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const env = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const { Tmdb } = require("tmdb");
const handle = nextApp.getRequestHandler();
const tmdb = new Tmdb(process.env.MOVIE_API_KEY);
nextApp.prepare().then(() => {
  const server = express();

  server.get("/api/movies", async (req, res, next) => {
    try {
      const movies = await tmdb.get("movie/top_rated", {
        page: 1,
      });
      res.json(movies);
    } catch (error) {
      console.log("error", error);
    }
  });
  server.get("/api/movies/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const getMovie = await tmdb.getMovie(id);
      const getMovieCrewCredits = await tmdb.getMovieCrewCredits(id);

      res.send({
        getMovie,
        getMovieCrewCredits,
      });
    } catch (err) {
      console.log("error", err);
    }
  });
  server.get("/api/movie/search/:search", async (req, res) => {
    try {
      const { search } = req.params;
      const getMovieInfo = await tmdb.get("search/movie", {
        query: search,
      });
      res.json(getMovieInfo);
    } catch (error) {
      console.log("error", error);
    }
  });
  server.get("/api/movie/page/:page", async (req, res, next) => {
    try {
      const { page } = req.params;
      const movie = await tmdb.get("movie/top_rated", {
        page: page,
      });
      res.json(movie);
    } catch (error) {
      console.log(error);
    }
  });
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
