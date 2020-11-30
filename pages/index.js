"use strict";

import Movies from "../components/Movies";
import Layout from "../components/Layout";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import ReactPaginate from "react-paginate";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import getMoviesList from "../utility";

const Index = (props) => {
  const search = useStoreState((state) => state.search.search);
  const setSearch = useStoreActions((actions) => actions.search.setSearch);
  const searchResult = useStoreState((state) => state.search.searchResult);
  const setSearchResult = useStoreActions(
    (action) => action.search.setSearchResult
  );
  const pagination = useStoreState((state) => state.search.pagination);
  const setPagination = useStoreActions(
    (action) => action.search.setPagination
  );
  const movieHelper = getMoviesList(props.movies.results);

  const movieList = useStoreState((state) => state.search.movieList);
  const setMovieList = useStoreActions(
    (actions) => actions.search.setMovieList
  );
  const is_pagination = useStoreState((state) => state.search.is_pagination);
  const setIs_pagination = useStoreActions(
    (actions) => actions.search.setIs_pagination
  );

  useEffect(() => {
    const data =
      search &&
      search.length &&
      searchResult &&
      searchResult.results &&
      searchResult.results.length > 0;
    const page = pagination && pagination.length > 0;

    if (data) {
      setMovieList(getMoviesList(searchResult.results));
      setIs_pagination(false);
    } else if (!data && page) {
      setMovieList(pagination);
      setIs_pagination(true);
    } else {
      setMovieList(movieHelper);
      setIs_pagination(true);
    }
  }, [props.movies.results, pagination, searchResult]);

  return (
    <Layout
      content={
        <div>
          <Head>
            <title>Welcome To InfoMovie</title>
          </Head>
          <section id="home-movies">
            <div className="container">
              <div>
                <form
                  onSubmit={async (e) => {
                    try {
                      e.preventDefault();
                      const response = await fetch(
                        `/api/movie/search/${search}`
                      );
                      const res = await response.json();

                      setSearchResult(res);
                      setSearch(e.target.reset());
                    } catch (error) {
                      console.log(error);
                      return;
                    }
                  }}
                >
                  <div className="search-container">
                    <input
                      type="search"
                      placeholder="Search Movies"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button>Search Movie</button>
                  </div>
                </form>
              </div>
              <h2>Info Movies</h2>
              <div className="movies-container py-2">
                {movieList && movieList.length > 0 ? (
                  movieList.map((movie, idx) => {
                    return <Movies key={idx} movie={movie} />;
                  })
                ) : (
                  <div> No movies Found</div>
                )}
              </div>
              <div className={is_pagination ? "pagination" : "no_pagination"}>
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={10}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={async (data) => {
                    const page = await fetch(
                      `http://localhost:3000/api/movie/page/${
                        data.selected + 1
                      }`
                    );
                    if (page.status !== 200) {
                      console.log(new Error("page selection issue"));
                    }
                    const info = await page.json();
                    setPagination(getMoviesList(info.results));
                  }}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
};
Index.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/movies");
  const movies = await response.json();

  return {
    movies,
  };
};
export default Index;
