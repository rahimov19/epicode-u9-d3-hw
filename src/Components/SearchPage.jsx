import React from "react";
import MoviesList from "./MoviesList";

export default function SearchPage({ searchValue }) {
  const value = searchValue;
  return (
    <div>
      <h1 className="searchH1">Results for {value}</h1>
      <MoviesList search={searchValue} title="Movies" par="movie" />
      <MoviesList search={searchValue} title="Series" par="series" />
    </div>
  );
}
