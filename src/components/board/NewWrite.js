import React, { useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NewWrite = () => {
  const contentRef = useRef();
  const navigate = useNavigate();

  const handleTempSave = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentValue = contentRef.current.value;
    const idToken = JSON.parse(localStorage.getItem("loginInfo")).idToken;
    const nowDate = new Date();

    const sendRequest = async () => {
      const response = await fetch(
        "https://peterpan-blog-default-rtdb.firebaseio.com/board.json",
        {
          method: "POST",
          body: JSON.stringify({
            content: contentValue,
            id: idToken,
            date: nowDate,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
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
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "500px" }}
          ref={contentRef}
        />
      </FloatingLabel>
      <Button type="button" onClick={handleTempSave} variant="outline-info">
        임시저장
      </Button>{" "}
      <Button type="submit" onClick={handleSubmit} variant="outline-primary">
        제출
      </Button>{" "}
    </form>
  );
};

export default NewWrite;
