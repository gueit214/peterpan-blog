import React, { useCallback, useEffect, useState } from "react";
import useFetch, { getCommentList } from "../../../hooks/useFetch";
import CommentItem from "./CommentItem";

const CommentList = ({ commentList }) => {
  return (
    <section className="CommentList">
      {commentList &&
        commentList.map((comment) => (
          <CommentItem key={comment.commentId} comment={comment} />
        ))}
    </section>
  );
};

export default React.memo(CommentList);
