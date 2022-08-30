import React from "react";

const CommentItem = ({ comment }) => {
  const thisDate = new Date(comment.date);
  const printingThisDate = `${thisDate.getMonth()}월 ${thisDate.getDate()}일 ${thisDate.getHours()}시 ${thisDate.getMinutes()}분`;
  console.log(printingThisDate);
  return (
    <section className="CommentItem">
      <div className="nickname">{comment.nickname}</div>
      <div className="content">{comment.content}</div>
      <div className="date">{printingThisDate}</div>
    </section>
  );
};

export default CommentItem;
