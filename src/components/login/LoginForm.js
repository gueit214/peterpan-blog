import React, { useContext, useReducer, useState } from "react";

import LoginContext, { LoginContextProvider } from "../../store/login-context";
import { useNavigate } from "react-router-dom";
import Loading from "../UI/Loading";
import AlertModal from "../UI/AlertModal";
import { firebaseConfig } from "../../store/firebase";
import useFetch, { loginFetch } from "../../hooks/useFetch";

const LoginForm = () => {
  const navigate = useNavigate();
  const { sendRequest, status, message, data, setFetchStateDefault } =
    useFetch(loginFetch);
  const { onLogin } = useContext(LoginContext);

  // 로그인 버튼
  const handleLogin = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    const pw = e.target[1].value;
    await sendRequest({ email: id, password: pw, returnSecureToken: true });
  };
  console.log(status, message, data);
  // data 중 displayname(nickname)을 localStorage에 저장하기
  if (status === "success") {
    onLogin({ nickname: data.displayName });
  }
  const successScreen = status === "success" && (
    <AlertModal
      title="축하합니다!"
      message={"로그인에 성공하였습니다!"}
      handleClose={() => {
        navigate("/");
      }}
    />
  );
  const loadingScreen = status === "loading" && <Loading />;
  const errorScreen = status === "error" && (
    <AlertModal
      title="에러가 발생하였습니다."
      message={message}
      handleClose={setFetchStateDefault}
    />
  );
  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      {loadingScreen}
      {successScreen}
      {errorScreen}
      <div className="input-group mb-3">
        <label className="input-group-text">이메일</label>
        <input type="id" className="form-control" />
      </div>
      <div className="input-group">
        <label className="input-group-text">비밀번호</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn-login btn btn-outline-success">
        로그인
      </button>
      <button
        type="button"
        className="btn-login btn btn-outline-success"
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
