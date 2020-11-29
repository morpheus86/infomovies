"use strict";

import { createStore, action } from "easy-peasy";

export default createStore({
  search: {
    search: "",
    is_pagination: true,
    searchResult: [],
    movieList: [],
    pagination: [],
    setSearch: action((state, payload) => {
      state.search = payload;
    }),
    setSearchResult: action((state, payload) => {
      state.searchResult = payload;
    }),
    setMovieList: action((state, payload) => {
      state.movieList = payload;
    }),
    setPagination: action((state, payload) => {
      state.pagination = payload;
    }),
    setIs_pagination: action((state, payload) => {
      state.is_pagination = payload;
    }),
  },
  like: {
    clicked: false,
    thumbsUp: 0,
    thumbsDown: 0,
    hasLiked: false,
    hasDisliked: false,
    setThumbsUp: action((state, payload) => {
      state.thumbsUp = payload;
      state.hasLiked = true;
      state.hasDisliked = false;
    }),
    setThumbsDown: action((state, payload) => {
      state.thumbsDown = payload;
      state.hasDisliked = true;
      state.hasLiked = false;
    }),
    setClicked: action((state, payload) => {
      state.clicked = payload;
    }),
  },
});
