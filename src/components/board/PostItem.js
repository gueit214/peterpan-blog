import React from "react";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  const date = `${data.date.slice(5, 7)}월 ${data.date.slice(8, 10)}일`;

  const handlePost = () => {
    navigate(`post/${data.id}`);
  };
  return (
    <li className="PostItem">
      <ul className="post" onClick={handlePost}>
        <li className="title">{data.title}</li>
        <li className="date">{date}</li>
      </ul>
    </li>
  );
};
// id: data[0],
// content: data[1].content,
// date: data[1].date,
// authorId: data[1].id,
export default PostItem;
