import React from "react";
import BoardItem from "./BoardItem";

const DUMPBOARD = [
  { id: "b1", name: "board1", title: "자유게시판" },
  { id: "b2", name: "board2", title: "유머게시판" },
  { id: "b3", name: "board3", title: "소통게시판" },
  { id: "b4", name: "board4", title: "취미게시판" },
];

const BoardList = () => {
  return (
    <div className="BoardList">
      {DUMPBOARD.map((board) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </div>
  );
};

export default React.memo(BoardList);
