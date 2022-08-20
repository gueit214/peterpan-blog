import BoardItem from "./BoardItem";

const DUMPBOARD = [
  { id: "b1", name: "board1", title: "게시판1" },
  { id: "b2", name: "board2", title: "게시판2" },
  { id: "b3", name: "board3", title: "게시판3" },
  { id: "b4", name: "board4", title: "게시판4" },
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

export default BoardList;
