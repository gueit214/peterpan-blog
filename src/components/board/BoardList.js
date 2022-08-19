import BoardItem from "./BoardItem";

const DUMPBOARD = [
  { id: "b1", title: "게시판1" },
  // { id: "b2", title: "게시판2" },
  // { id: "b3", title: "게시판3" },
  // { id: "b4", title: "게시판4" },
];

const BoardList = () => {
  return (
    <div className="BoardList">
      {DUMPBOARD.map((board) => (
        <BoardItem key={board.id} title={board.title} />
      ))}
    </div>
  );
};

export default BoardList;
