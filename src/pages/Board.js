import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../components/board/BoardList";
import "./Board.scss";

const Board = () => {
  const navigate = useNavigate();
  const handleNewWrite = () => {
    navigate("/newwrite");
  };
  return (
    <div className="Board">
      <Button
        className="board-new-write"
        onClick={handleNewWrite}
        variant="outline-secondary"
      >
        글쓰기
      </Button>{" "}
      <BoardList />
    </div>
  );
};

export default Board;
