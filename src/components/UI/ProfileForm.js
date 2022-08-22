import React, { useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ProfileForm = (props) => {
  // 받아야할 props ; handleSubmit함수, isLoading bool값
  const onNoShowTooltipNickname = () => {
    props.turnOffShowtoolTipNickname();
  };

  return (
    <Form onSubmit={props.handleSubmit} className="SignupForm">
      <Form.Group as={Row} className="id" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          아이디
          <br />
          (이메일 형식)
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="a@b.com" autoFocus />
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
          <OverlayTrigger
            overlay={<Tooltip>영어로만 입력해주세요</Tooltip>}
            show={props.isShowTooltipNickname}
          >
            <Form.Control
              type="text"
              placeholder="dongdong"
              onFocus={onNoShowTooltipNickname}
            />
          </OverlayTrigger>
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
      {/* <Form.Group as={Row} controlId="formFile" className="photo">
        <Form.Label column sm="2">
          프로필 사진
        </Form.Label>
        <Col sm="10">
          <Form.Control type="file" />
        </Col>
      </Form.Group> */}
      <Button className="btn-submit" variant="outline-success" type="submit">
        제출하기
      </Button>{" "}
    </Form>
  );
};

export default ProfileForm;
