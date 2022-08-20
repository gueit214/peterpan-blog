import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const params = useParams();
  const [postData, setPostData] = useState([]);

  const fetchPost = useCallback(async () => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://peterpan-blog-default-rtdb.firebaseio.com/board1/${params.id}.json`
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
  let date;
  if (postData.date) {
    date = `${postData.date.slice(0, 4)}년 ${postData.date.slice(
      5,
      7
    )}월 ${postData.date.slice(8, 10)}일`;
  }

  // // const date = `${postData.date.slice(0, 4)}년 ${postData.date.slice(
  //   5,
  //   7
  // )}월 ${postData.date.slice(8, 10)}일`;
  return (
    <div className="PostDetail">
      <div className="title">
        <p>{postData.title}</p>
      </div>
      <div className="content">{postData.content}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default React.memo(PostDetail);
