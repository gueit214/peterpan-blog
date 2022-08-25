import React from "react";
import { useNavigate } from "react-router-dom";

const PostItem = ({ data }) => {
  const navigate = useNavigate();
  const writedDate = new Date(data.date);
  const printingWritedDate = `${writedDate.getMonth()}월 ${writedDate.getDate()}일`;
  const handlePost = () => {
    navigate(`${data.writeCount}`);
  };
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
