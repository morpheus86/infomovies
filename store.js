"use strict";

import { createStore, action } from "easy-peasy";

export default createStore({
  modals: {
    showModal: false,
    showSearchModal: true,
    setShowModal: action((state) => {
      state.showModal = true;
    }),
    setHideModal: action((state) => {
      state.showModal = false;
    }),
    setShowSearchModal: action((state) => {
      state.showModal = true;
      state.setShowsearchModal = true;
    }),
  },
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
});
