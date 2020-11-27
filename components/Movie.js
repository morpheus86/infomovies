"use strict";
import Link from "next/link";
const Movie = (props) => {
  const { movie } = props;

  return (
    <Link href="/movies/[id]" as={"movies/" + movie.id}>
      <div>
        <img src={movie.poster_path} alt={movie.title} />
        <h3>{movie.original_title}</h3>
        <button>Read More</button>
      </div>
    </Link>
  );
};

export default Movie;
