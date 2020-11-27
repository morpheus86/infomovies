"use strict";
import fetch from "isomorphic-unfetch";
import { useStoreActions, useStoreState } from "easy-peasy";

const Search = (props) => {
  const search = useStoreState((state) => state.search.search);
  const setSearch = useStoreActions((actions) => actions.search.setSearch);

  return (
    <form
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          const response = await fetch(`/api/movie/search/${search}`);
          const res = await response.json();
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
  );
};

export default Search;
