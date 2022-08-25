import React from "react";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  const writedDate = new Date(data.date);
  const printingWritedDate = `${writedDate.getMonth()}월 ${writedDate.getDate()}일`;
  const handlePost = () => {
    navigate(`${data.boardName}/${data.id}`);
  };
  console.log(data.date);
  return (
    <li className="PostItem">
      <ul className="post" onClick={handlePost}>
        <div className="first-line">
          <div className="author">{data.nickname}</div>
          <div className="date">{printingWritedDate}</div>
        </div>
        <div className="second-line">
          <div className="title">{data.title}</div>
        </div>
      </ul>
    </li>
  );
};

export default React.memo(PostItem);
