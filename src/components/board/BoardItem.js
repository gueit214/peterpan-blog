import React from "react";
import PostList from "./PostList";

const BoardItem = (props) => {
  const { board } = props;
  return (
    <div className="BoardItem">
      <h1 className="title-board">{board.title}</h1>
      <PostList board={board} />
    </div>
  );
};

export default React.memo(BoardItem);
