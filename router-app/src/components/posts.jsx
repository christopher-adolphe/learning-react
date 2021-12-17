import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Posts = () => {
  // Since `Posts` is a stateless functional component
  // we can use the `useParams` hook from `react-router-dom`
  // to read url parameters
  const { year, month } = useParams();
  const [ searchParams ] = useSearchParams();
  console.log('Posts - searchParams: ', searchParams);

  return (
    <div>
      <h1>Posts</h1>
      Year: { year }, Month: { month }
    </div>
  );
};

export default Posts;
