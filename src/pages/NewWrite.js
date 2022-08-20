import React, { useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NewWrite = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const boardRef = useRef();
  const navigate = useNavigate();

  const handleTempSave = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleValue = titleRef.current.value;
    const contentValue = contentRef.current.value;
    const boardValue = boardRef.current.value;
    const idToken = JSON.parse(localStorage.getItem("loginInfo")).idToken;
    const nowDate = new Date();

    const sendRequest = async () => {
      const response = await fetch(
        `https://peterpan-blog-default-rtdb.firebaseio.com/${boardValue}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            title: titleValue,
            content: contentValue,
            id: idToken,
            date: nowDate,
          }),
        }
      );
      if (response.ok) {
        navigate("/board");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className="NewWrite">
      <section className="post-section">
        <FloatingLabel
          className="title"
          controlId="floatingTextarea2"
          label="Title"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a title here"
            ref={titleRef}
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
            ref={contentRef}
          />
        </FloatingLabel>
        <Form.Select
          className="board"
          ref={boardRef}
          aria-label="Default select example"
        >
          <option value="board1">게시판1</option>
          <option value="board2">게시판2</option>
          <option value="board3">게시판3</option>
          <option value="board4">게시판4</option>
        </Form.Select>
      </section>
      <section className="btn-section btn-group">
        <Button type="button" onClick={handleTempSave} variant="outline-info">
          임시저장
        </Button>{" "}
        <Button type="submit" onClick={handleSubmit} variant="outline-primary">
          제출
        </Button>{" "}
      </section>
    </form>
  );
};

export default NewWrite;
