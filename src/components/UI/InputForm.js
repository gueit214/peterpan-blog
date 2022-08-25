import React, { useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import useFetch, { getAllProfile } from "../../hooks/useFetch";
import useScreen from "../../hooks/useScreen";
import AlertModal from "./AlertModal";

const InputForm = (props) => {
  const { handleSubmit, tooltipMessage, turnOffAllTooltip } = props;

  const nicknameRef = useRef();
  const [overlayStatus, setOverlayStatus] = useState("default");

  // 닉네임 검사 - 중복검사
  const { sendRequest, setFetchStateDefault, status, message } =
    useFetch(getAllProfile);
  const checkNicknameOverlay = async () => {
    const profileDataResponse = await sendRequest();
    const nicknameList = Object.keys(profileDataResponse);
    if (!nicknameList.includes(nicknameRef.current.value)) {
      setOverlayStatus("success");
    } else {
      setOverlayStatus("error");
    }
    return;
  };

  const screen = useScreen({
    status: overlayStatus,
    errorMessage: "중복되는 닉네임입니다!",
    successMessage: "사용가능한 닉네임입니다!",
    setFetchStateDefault: () => {
      setOverlayStatus("");
    },
    goToMainIfSuccess: false,
  });

  return (
    <section className="InputForm">
      {screen}

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="id" controlId="id">
          <Form.Label column sm="2">
            아이디
            <br />
            (이메일 형식)
          </Form.Label>
          <Col sm="10">
            <OverlayTrigger
              overlay={<Tooltip>{tooltipMessage.id}</Tooltip>}
              show={tooltipMessage.id}
            >
              <Form.Control
                type="text"
                placeholder="a@b.com"
                autoFocus
                onFocus={turnOffAllTooltip}
              />
            </OverlayTrigger>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="pw" controlId="pw">
          <Form.Label column sm="2">
            비밀번호
          </Form.Label>
          <Col sm="10">
            <OverlayTrigger
              overlay={<Tooltip>{tooltipMessage.pw}</Tooltip>}
              show={tooltipMessage.pw !== ""}
            >
              <Form.Control
                type="password"
                placeholder="Password"
                onFocus={turnOffAllTooltip}
              />
            </OverlayTrigger>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="name" controlId="name">
          <Form.Label column sm="2">
            이름
          </Form.Label>
          <Col sm="10">
            <OverlayTrigger
              overlay={<Tooltip>{tooltipMessage.name}</Tooltip>}
              show={tooltipMessage.name !== ""}
            >
              <Form.Control
                type="text"
                placeholder="홍길동"
                onFocus={turnOffAllTooltip}
              />
            </OverlayTrigger>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="number" controlId="number">
          <Form.Label column sm="2">
            전화번호
          </Form.Label>
          <Col sm="10">
            <OverlayTrigger
              overlay={<Tooltip>{tooltipMessage.number}</Tooltip>}
              show={tooltipMessage.number !== ""}
            >
              <Form.Control
                type="text"
                placeholder="010-1234-5678"
                onFocus={turnOffAllTooltip}
              />
            </OverlayTrigger>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="nickname" controlId="nickname">
          <Form.Label column sm="2">
            닉네임
          </Form.Label>
          <Col sm="10">
            <OverlayTrigger
              overlay={<Tooltip>{tooltipMessage.nickname}</Tooltip>}
              show={tooltipMessage.nickname !== ""}
            >
              <Form.Control
                type="text"
                placeholder="dongdong"
                onFocus={turnOffAllTooltip}
                ref={nicknameRef}
              />
            </OverlayTrigger>
            <Button
              variant="outline-dark"
              className="button-check-overlay"
              onClick={checkNicknameOverlay}
            >
              중복 검사
            </Button>
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
    </section>
  );
};

export default React.memo(InputForm);
