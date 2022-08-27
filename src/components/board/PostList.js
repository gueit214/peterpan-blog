import React, { useCallback, useEffect, useState } from "react";
import useFetch, { getPostList } from "../../hooks/useFetch";
import useScreen from "../../hooks/useScreen";
import PostItem from "./PostItem";

const PostList = (props) => {
  const [postList, setPostList] = useState([]);
  const { board } = props;

  const { sendRequest, status, message, setFetchStateDefault } =
    useFetch(getPostList);

  const getPostFromDB = useCallback(async () => {
    const responsePost = await sendRequest();
    if (responsePost) {
      const thisBoardPost = Object.values(responsePost).filter(
        (post) => post.board === board.name
      );
      const responsePostList = [];
      if (!responsePost) {
        return;
      }
      Object.entries(thisBoardPost).forEach((post) => {
        responsePostList.push({
          id: post[0],
          ...post[1],
          boardName: board.name,
        });
      });
      setPostList(responsePostList);
    }
  }, []);

  useEffect(() => {
    getPostFromDB();
  }, [getPostFromDB]);

  const screen = useScreen({
    status,
    errorMessage: message,
    setFetchStateDefault,
    goToMainIfSuccess: false,
  });

  return (
    <ul className="PostList">
      {screen}
      {postList &&
        postList.map((data) => <PostItem key={data.id} data={data} />)}
    </ul>
  );
};

export default React.memo(PostList);
