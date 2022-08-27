import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BoardList from "../components/board/BoardList";
import useFetch, { getProfileFetchFromAuth } from "../hooks/useFetch";
import useScreen from "../hooks/useScreen";

const Board = () => {
  const navigate = useNavigate();

  const { sendRequest, data, status, message, setFetchStateDefault } = useFetch(
    getProfileFetchFromAuth
  );

  const dowhenGetPage = async () => {
    if (!localStorage.getItem("displayName")) {
      const { idToken } = JSON.parse(localStorage.getItem("loginInfo"));
      await sendRequest({ idToken });
    }
  };
  if (status === "success") {
    localStorage.setItem("displayName", data?.users[0].displayName);
  }

  useEffect(() => {
    dowhenGetPage();
  }, []);

  const screen = useScreen({
    status,
    errorMessage: "불러오는데 실패 했습니다. 다시 로그인 해주세요",
    setFetchStateDefault,
  });

  const handleNewWrite = () => {
    navigate("new");
  };
  return (
    <div className="Board">
      {screen}
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
