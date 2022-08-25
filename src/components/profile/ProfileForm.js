import React, { useContext, useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useFetch, { updateProfileFetch } from "../../hooks/useFetch";

import LoginContext from "../../store/login-context";
import useScreen from "../../hooks/useScreen";

const ProfileForm = (props) => {
  const { onLogin } = useContext(LoginContext);
  const [isEdit, setIsEdit] = useState(false);
  const { myProfile } = props;
  const { sendRequest, status, message, data, setFetchStateDefault } =
    useFetch(updateProfileFetch);

  useEffect(() => {
    if (status === "success") {
      onLogin(data.changePasswordResponseData?.idToken);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    const pw = e.target[1].value;
    const name = e.target[2].value;
    const number = e.target[3].value;
    const nickname = e.target[4].value;
    const photoUrl = e.target[5].value;

    await sendRequest({
      profileData: {
        idToken: props.idToken,
        displayName: nickname,
        photoUrl: photoUrl,
      },
      passwordData: {
        idToken: props.idToken,
        password: pw,
        returnSecureToken: true,
      },
    });
    setIsEdit(false);
  };

  const screen = useScreen({
    status,
    successMessage: "프로필 변경에 성공하였습니다!",
    errorMessage: message,
    setFetchStateDefault,
  });

  const buttonSection = isEdit ? (
    <div className="button-section">
      <Button
        className="btn-submit"
        variant="outline-success"
        type="button"
        onClick={() => {
          setIsEdit(false);
        }}
      >
        취소
      </Button>
      <Button className="btn-submit" variant="outline-success" type="submit">
        완료
      </Button>
    </div>
  ) : (
    <div className="button-section">
      <Button
        className="btn-submit"
        variant="outline-success"
        type="button"
        onClick={() => {
          setIsEdit(true);
        }}
      >
        수정하기
      </Button>
    </div>
  );

  return (
    <div className="ProfileForm">
      {screen}
      <section className="title">
        <h1>My Profile</h1>
      </section>
      <section className="main">
        {/* <InputForm /> */}
        <Form onSubmit={handleSubmit} className="SignupForm">
          <Form.Group as={Row} className="id" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              아이디
              <br />
              (이메일 형식)
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                autoFocus
                disabled={!isEdit}
                placeholder={myProfile?.email}
                defaultValue={myProfile?.email}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="pw" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              비밀번호
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                disabled={!isEdit}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="name" controlId="formPlaintextName">
            <Form.Label column sm="2">
              이름
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                disabled={!isEdit}
                placeholder={myProfile?.name}
                defaultValue={myProfile?.name}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="number"
            controlId="formPlaintextNumber"
          >
            <Form.Label column sm="2">
              전화번호
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                disabled={!isEdit}
                placeholder={myProfile?.number}
                defaultValue={myProfile?.number}
              />
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
              <Form.Control
                type="text"
                disabled={!isEdit}
                placeholder={myProfile?.displayName}
                defaultValue={myProfile?.displayName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formFile" className="photo">
            <Form.Label column sm="2">
              프로필 사진
            </Form.Label>
            <Col sm="10">
              <Form.Control type="file" disabled={!isEdit} />
            </Col>
          </Form.Group>
          {buttonSection}
        </Form>
      </section>
    </div>
  );
};

export default ProfileForm;
