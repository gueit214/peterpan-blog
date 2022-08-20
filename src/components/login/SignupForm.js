import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { initializeApp } from "firebase/app";
import { storage, firebaseConfig } from "../../store/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Loading from "../UI/Loading";
import ErrorModal from "../UI/ErrorModal";

const SignupForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);
  const handleClose = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
    const sendRequest_signup = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: e.target[0].value,
          password: e.target[1].value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error.message);
      }
    };
    try {
      const responseData = await sendRequest_signup();
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          id: responseData.email,
          idToken: responseData.idToken,
        })
      );
      navigate("/");
    } catch (error) {
      setError(String(error));
    }
    // 파일 업로드
    const file = e.target[5];
    if (!file) return;
    const storageRef = ref(storage, `assets/${e.target[2].value}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );

    // 개인정보 (아이디, 이름, 전화번호, 프로필 사진) DB에 따로 저장
    const sendRequest_private = async () => {
      const response = await fetch(
        `https://peterpan-blog-default-rtdb.firebaseio.com/profile/${e.target[2].value}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            id: e.target[0].value,
            name: e.target[1].value,
            nickname: e.target[2].value,
            number: e.target[3].value,
            photo: imgUrl,
          }),
        }
      );
    };
    try {
      sendRequest_private();
    } catch (error) {
      setError(String(error));
    }
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="SignupForm">
      {error && <ErrorModal message={error} handleClose={handleClose} />}
      {isLoading && <Loading />}
      <Form.Group as={Row} className="id" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          아이디
          <br />
          (이메일 형식)
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="a@b.com" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="pw" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          비밀번호
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="name" controlId="formPlaintextName">
        <Form.Label column sm="2">
          이름
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="홍길동" />
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
        className="nickname"
        controlId="formPlaintextNickname"
      >
        <Form.Label column sm="2">
          별명
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="동에 번쩍 서에 번쩍" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="number" controlId="formPlaintextNumber">
        <Form.Label column sm="2">
          전화번호
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="010-1234-5678" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formFile" className="photo">
        <Form.Label column sm="2">
          프로필 사진
        </Form.Label>
        <Col sm="10">
          <Form.Control type="file" />
        </Col>
      </Form.Group>
      <Button className="btn-submit" variant="outline-success" type="submit">
        제출하기
      </Button>{" "}
    </Form>
  );
};

export default SignupForm;
