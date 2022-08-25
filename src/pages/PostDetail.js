import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const PostDetail = () => {
  const params = useParams();
  const [postData, setPostData] = useState([]);

  const fetchPost = useCallback(async () => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://peterpan-blog-default-rtdb.firebaseio.com/${params.boardName}/${params.id}.json`
      );
      const reponseData = await response.json();
      if (response.ok) {
        setPostData({
          id: params.id,
          content: reponseData.content,
          date: reponseData.date,
          authorId: reponseData.id,
          title: reponseData.title,
        });
        return;
      } else {
        throw new Error(reponseData.error);
      }
    };
    try {
      await sendRequest();
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchPost();
  }, []);
  const writedDate = new Date(postData.date);
  const printingWritedDate = `${writedDate.getFullYear()}년 ${writedDate.getMonth()}월 ${writedDate.getDate()}일 ${writedDate.getHours()}시 ${writedDate.getMinutes()}분`;

  const handleEditPost = () => {};
  const handleDeletePost = () => {};

  return (
    <div className="PostDetail">
      <div className="title">
        <p>{postData.title}</p>
      </div>
      <div className="content">{postData.content}</div>
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
