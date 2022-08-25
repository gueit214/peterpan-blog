import React, { useContext, useEffect } from "react";

import LoginContext from "../../store/login-context";
import { useNavigate } from "react-router-dom";
import useFetch, { loginFetch } from "../../hooks/useFetch";
import useScreen from "../../hooks/useScreen";

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

  useEffect(() => {
    if (status === "success") {
      onLogin(data.idToken);
    }
  }, [status]);

  const screen = useScreen({
    status,
    successMessage: "로그인에 성공하였습니다!",
    errorMessage: message,
    setFetchStateDefault,
  });

  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      {screen}
      <div className="input-group mb-3">
        <label className="input-group-text">이메일</label>
        <input type="id" className="form-control" />
      </div>
      <div className="input-group">
        <label className="input-group-text">비밀번호</label>
        <input type="password" className="form-control" />
      </div>
      <div className="button-group">
        <button type="submit" className="btn btn-outline-success">
          로그인
        </button>
        <button
          type="button"
          className=" btn btn-outline-success"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
