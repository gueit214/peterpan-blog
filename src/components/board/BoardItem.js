import React from "react";
import PostList from "./PostList";

const BoardItem = (props) => {
  return (
    <div className="BoardItem">
      <h1 className="title">{props.title}</h1>
      <PostList />
    </div>
  );
};

export default BoardItem;
