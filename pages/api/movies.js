const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const bodyParser = require("body-parser");
const env = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const { Tmdb } = require("tmdb");
const db = require("../../model/database");
const Movies = require("../../model/movies.model");
const handle = nextApp.getRequestHandler();
const tmdb = new Tmdb(process.env.MOVIE_API_KEY);
const cookieParser = require("cookie-parser");
nextApp.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use((req, res, next) => {
    try {
      let cookie = req.cookies.cookieName;
      if (cookie === undefined) {
        // one day from now
        let date = new Date(Date.now() + 86400e3);

        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie("cookieName", randomNumber, {
          maxAge: date,
          httpOnly: true,
        });
        console.log("cookie created successfully");
      } else {
        console.log("cookie exist", cookie);
      }
      next();
    } catch (error) {
      console.log("error", error);
    }
  });
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
  server.post("/api/movie/like", async (req, res, next) => {
    try {
      const { id, title, cookie } = req.body;
      const oldCookie = req.cookies.cookieName;

      let like = await Movies.findAll({
        where: {
          moviesId: id,
        },
      });
      if (like[0]) {
        if (oldCookie === cookie) {
          const thumbsUp = await Movies.update(
            {
              thumbsup: like[0].thumbsup,
            },
            {
              where: {
                moviesId: id,
              },
            }
          );
        } else {
          const thumbsUp = await Movies.update(
            {
              thumbsup: like[0].thumbsup + 1,
            },
            {
              where: {
                moviesId: id,
              },
            }
          );
        }
      } else {
        like = await Movies.create({
          title: title,
          thumbsup: 1,
          thumbsdown: 0,
          moviesId: id,
        });
      }

      res.send(like);
    } catch (error) {
      console.log("error", error);
    }
  });
  server.post("/api/movie/dislike", async (req, res, next) => {
    try {
      const { id, title, cookie } = req.body;
      const oldCookie = req.cookies.cookieName;
      let disLike = await Movies.findAll({
        where: {
          moviesId: id,
        },
      });
      if (disLike[0]) {
        if (oldCookie === cookie) {
          const thumbsDown = await Movies.update(
            {
              thumbsdown: disLike[0].thumbsdown,
            },
            {
              where: {
                moviesId: id,
              },
            }
          );
        } else {
          const thumbsDown = await Movies.update(
            {
              thumbsdown: disLike[0].thumbsdown + 1,
            },
            {
              where: {
                moviesId: id,
              },
            }
          );
        }
      } else {
        disLike = await Movies.create({
          title: title,
          thumbsup: 0,
          thumbsdown: 1,
          moviesId: id,
        });
      }

      res.send(disLike);
    } catch (error) {
      console.log("error", error);
    }
  });
  server.get("/api/movie/rating/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const cookie = req.cookies.cookieName;
      const getMovie = await Movies.findAll({
        where: {
          moviesId: id,
        },
      });
      res.send({ getMovie, cookie });
    } catch (error) {
      console.log("error", error);
    }
  });

  const syncDb = () => db.sync();

  Movies.sync({ alter: true });
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  async function bootApp() {
    try {
      await syncDb;
    } catch (error) {
      console.log(error);
    }
  }
  bootApp();

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
