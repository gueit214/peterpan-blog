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
    const responsePost = await sendRequest(board.name);
    const reponsePostList = [];
    if (!responsePost) {
      return;
    }
    Object.entries(responsePost).forEach((post) => {
      reponsePostList.push({
        id: post[0],
        title: post[1].title,
        content: post[1].content,
        date: post[1].date,
        nickname: post[1].nickname,
        boardName: board.name,
      });
    });
    setPostList(reponsePostList);
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
