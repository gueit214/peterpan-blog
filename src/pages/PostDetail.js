import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import useFetch, {
  deletePostList,
  getCommentList,
  getPostList,
  writeNewComment,
} from "../hooks/useFetch";
import useScreen from "../hooks/useScreen";
import NewComment from "../components/board/comment/NewComment";
import CommentList from "../components/board/comment/CommentList";

const PostDetail = () => {
  const navigate = useNavigate();
  const { writeCount } = useParams();
  const [post, setPost] = useState([]);
  const [commentListState, setCommentListState] = useState(null);

  // useFetch
  const { sendRequest, status, message, setFetchStateDefault } =
    useFetch(getPostList);
  const {
    sendRequest: deleteSendRequest,
    status: deleteState,
    message: deleteMessage,
    setFetchStateDefault: deleteSetFetchStateDefault,
  } = useFetch(deletePostList);
  const {
    setFetchStateDefault: commentSetFetchStateDefault,
    status: commentStatus,
    message: commentMeesage,
    sendRequest: commentSendRequest,
  } = useFetch(getCommentList);

  // SCREEN
  const screen = useScreen({
    status,
    errorMessage: message,
    setFetchStateDefault,
    goToMainIfSuccess: false,
  });
  const deleteScreen = useScreen({
    status: deleteState,
    errorMessage: deleteMessage,
    setFetchStateDefault: deleteSetFetchStateDefault,
    goToMainIfSuccess: true,
  });

  // POST와 Comment 가져오기 함수
  const getPostAndCommentFromDB = useCallback(async () => {
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
    const dataComment = await commentSendRequest({
      postId: Object.keys(responsePost)[thisPostIndex],
    });
    if (dataComment) {
      const commentList = Object.entries(dataComment).map((value) => {
        return {
          commentId: value[0],
          ...value[1],
        };
      });
      setCommentListState(commentList);
    }
    return;
  }, []);
  useEffect(() => {
    getPostAndCommentFromDB();
  }, []);

  const writedDate = new Date(post.date);
  const printingWritedDate = `${writedDate.getFullYear()}년 ${writedDate.getMonth()}월 ${writedDate.getDate()}일 ${writedDate.getHours()}시 ${writedDate.getMinutes()}분`;
  const handleEditPost = () => {
    localStorage.setItem("thisPost", JSON.stringify(post));
    navigate("edit");
  };

  const handleDeletePost = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteSendRequest(post.id);
      navigate("/board");
    }
  };

  const { sendRequest: commentAddSendRequest } = useFetch(writeNewComment);

  const onSubmit = async ({ comment, nickname }) => {
    await commentAddSendRequest({
      nickname,
      content: comment,
      date: new Date(),
      postId: post.id,
    });
    const dataComment = await commentSendRequest({
      postId: post.id,
    });
    if (dataComment) {
      const commentList = Object.entries(dataComment).map((value) => {
        return {
          commentId: value[0],
          ...value[1],
        };
      });
      setCommentListState(commentList);
    }
  };

  const buttonScreen = post.nickname ===
    localStorage.getItem("displayName") && (
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
  );
  return (
    <div className="PostDetail">
      {screen}
      <section className="post">
        <div className="title">
          <p>{post.title}</p>
        </div>
        <div className="nickname">{post.nickname}</div>
        <div className="content">{post.content}</div>
        <div className="date">{printingWritedDate}</div>
        {buttonScreen}
      </section>
      <NewComment postId={post.id} onSubmit={onSubmit} />
      {commentListState && <CommentList commentList={commentListState} />}
    </div>
  );
};

export default React.memo(PostDetail);
