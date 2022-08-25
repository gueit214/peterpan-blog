import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import useFetch, { deletePostList, getPostList } from "../hooks/useFetch";
import useScreen from "../hooks/useScreen";

const PostDetail = () => {
  const navigate = useNavigate();
  const { writeCount } = useParams();
  const [post, setPost] = useState([]);

  const { sendRequest, status, message, setFetchStateDefault } =
    useFetch(getPostList);
  const screen = useScreen({
    status,
    errorMessage: message,
    setFetchStateDefault,
    goToMainIfSuccess: false,
  });
  const {
    sendRequest: deleteSendRequest,
    status: deleteState,
    message: deleteMessage,
    setFetchStateDefault: deleteSetFetchStateDefault,
  } = useFetch(deletePostList);
  const deleteScreen = useScreen({
    status: deleteState,
    errorMessage: deleteMessage,
    setFetchStateDefault: deleteSetFetchStateDefault,
    goToMainIfSuccess: true,
  });

  const getPostFromDB = useCallback(async () => {
    const responsePost = await sendRequest();
    const thisPostIndex = Object.values(responsePost).findIndex(
      (post) => post.writeCount === +writeCount
    );

    if (!responsePost) {
      return;
    }
    setPost({
      id: Object.keys(responsePost)[thisPostIndex],
      ...Object.values(responsePost)[thisPostIndex],
    });
  }, []);

  useEffect(() => {
    getPostFromDB();
  }, [getPostFromDB]);

  const writedDate = new Date(post.date);
  const printingWritedDate = `${writedDate.getFullYear()}년 ${writedDate.getMonth()}월 ${writedDate.getDate()}일 ${writedDate.getHours()}시 ${writedDate.getMinutes()}분`;
  const handleEditPost = () => {};
  const handleDeletePost = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteSendRequest(post.id);
    }
  };
  useState(() => {
    if (deleteState === "success") {
      navigate("/");
    }
  }, [deleteState]);

  return (
    <div className="PostDetail">
      {screen}
      {}
      <div className="title">
        <p>{post.title}</p>
      </div>
      <div className="content">{post.content}</div>
      <div className="date">{printingWritedDate}</div>
      <div className="button-group">
        <Button
          variant="outline-secondary"
          onClick={handleEditPost}
          className="button-edit"
        >
          수정
        </Button>{" "}
        <Button
          variant="outline-danger"
          onClick={handleDeletePost}
          className="button-delete"
        >
          삭제
        </Button>{" "}
      </div>
    </div>
  );
};

export default React.memo(PostDetail);
