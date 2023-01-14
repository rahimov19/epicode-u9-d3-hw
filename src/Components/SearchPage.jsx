import React from "react";

import MoviesList from "./MoviesList";

export default function SearchPage({ searchValue }) {
  return (
    <div>
      <h1>HELLOOOOOO</h1>
      <MoviesList search={searchValue} title="Movies" par="movie" />
      <MoviesList search={searchValue} title="Series" par="series" />
    </div>
  );
}
