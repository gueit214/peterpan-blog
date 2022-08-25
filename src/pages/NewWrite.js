import React, { useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import useFetch, { writeNewPost } from "../hooks/useFetch";
import useScreen from "../hooks/useScreen";

const NewWrite = () => {
  const navigate = useNavigate();
  const handleTempSave = () => {};
  const { sendRequest, status, message, setFetchStateDefault } =
    useFetch(writeNewPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    const board = e.target[2].value;
    const date = new Date();
    const nickname = localStorage.getItem("displayName");

    await sendRequest({
      title,
      content,
      date,
      nickname,
      board,
    });
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/board");
    }
  }, [status]);

  const screen = useScreen({
    status,
    errorMessage: message,
    setFetchStateDefault,
  });

  return (
    <form className="NewWrite" onSubmit={handleSubmit}>
      {screen}
      <section className="post-section">
        <FloatingLabel
          className="title"
          controlId="floatingTextarea2"
          label="Title"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a title here"
            // ref={titleRef}
          />
        </FloatingLabel>
        <FloatingLabel
          className="content"
          controlId="floatingTextarea2"
          label="Content"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a content here"
            // ref={contentRef}
          />
        </FloatingLabel>
        <Form.Select
          className="board"
          // ref={boardRef}
          aria-label="Default select example"
        >
          <option value="board1">자유게시판</option>
          <option value="board2">유머게시판</option>
          <option value="board3">소통게시판</option>
          <option value="board4">취미게시판</option>
        </Form.Select>
      </section>
      <section className="btn-section btn-group">
        <Button type="button" onClick={handleTempSave} variant="outline-info">
          임시저장
        </Button>{" "}
        <Button type="submit" variant="outline-primary">
          제출
        </Button>{" "}
      </section>
    </form>
  );
};

export default NewWrite;
