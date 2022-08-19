import React, { useCallback, useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostList = () => {
  const [postData, setPostData] = useState([]);

  const fetchPost = useCallback(async () => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://peterpan-blog-default-rtdb.firebaseio.com/board.json"
      );
      const reponseData = await response.json();
      if (response.ok) {
        let postDatas = [];
        Object.entries(reponseData).forEach((data) => {
          postDatas.push({
            id: data[0],
            content: data[1].content,
            date: data[1].date,
            authorId: data[1].id,
          });
        });
        return postDatas;
      } else {
        throw new Error(reponseData.error);
      }
    };
    const responseData = await sendRequest();
    setPostData(responseData);
  }, []);
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <ul className="PostList">
      <PostItem postData={postData} />
    </ul>
  );
};

export default React.memo(PostList);
