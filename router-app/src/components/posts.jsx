import React from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  // Since `Posts` is a stateless functional component
  // we can use the `useParams` hook from `react-router-dom`
  // to read url parameters
  const { year, month } = useParams();

  return (
    <div>
      <h1>Posts</h1>
      Year: { year }, Month: { month }
    </div>
  );
};

export default Posts;
