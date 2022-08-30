import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import useFetch, { writeNewComment } from "../../../hooks/useFetch";

const NewComment = ({ postId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const nickname = localStorage.getItem("displayName");
  const handleSubmitFunc = async ({ comment }) => {
    await onSubmit({ comment, nickname });
    setValue("comment", "");
  };

  return (
    <div className="NewComment">
      <div className="profile">{nickname}</div>
      <form className="comment-form">
        <input hidden="hidden" />
        <FloatingLabel
          controlId="floatingTextarea"
          label="Comment"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            className="comment-input"
            {...register("comment", { required: true })}
          />
        </FloatingLabel>
        <Button
          onClick={handleSubmit(handleSubmitFunc)}
          type="button"
          variant="outline-success"
          className="comment-button"
        >
          댓글쓰기
        </Button>
      </form>
    </div>
  );
};

export default NewComment;
