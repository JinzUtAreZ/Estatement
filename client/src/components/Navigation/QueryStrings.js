import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

/// IMPORTANT: for parsing query strings 2 ways

export const QueryStrings = () => {
  const { search } = useLocation();
  const { name, age } = queryString.parse(search);

  // NOTE: 2nd way ng parse query string

  const { search1 } = useLocation();
  const searchParams = new URLSearchParams(search1);
  const name1 = searchParams.get("name1");
  const age1 = searchParams.get("age1");

  return (
    <div>
      <h1>Name : {name} </h1>
      <h2>Age : {age} </h2>
    </div>
  );
};
