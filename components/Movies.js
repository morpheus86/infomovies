"use strict";

import Movie from "./Movie";
const Movies = (props) => {
  return (
    <>
      <article className="card">
        <Movie movie={props.movie} />
      </article>
    </>
  );
};

export default Movies;
