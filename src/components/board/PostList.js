import React, { useCallback, useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostList = (props) => {
  const [postData, setPostData] = useState([]);
  const { board } = props;
  const fetchPost = useCallback(async () => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://peterpan-blog-default-rtdb.firebaseio.com/${board.name}.json`
      );
      const reponseData = await response.json();
      if (response.ok) {
        let postDatas = [];
        Object.entries(reponseData).forEach((data) => {
          postDatas.push({
            id: data[0],
            title: data[1].title,
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
    try {
      const responseData = await sendRequest();
      setPostData(responseData);
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <ul className="PostList">
      {postData &&
        postData.map((data) => <PostItem key={data.id} data={data} />)}
    </ul>
  );
};

export default React.memo(PostList);
