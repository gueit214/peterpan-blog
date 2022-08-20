import React, { useContext, useReducer, useState } from "react";

import LoginContext from "../../store/login-context";
import { useNavigate } from "react-router-dom";
import Loading from "../UI/Loading";
import ErrorModal from "../UI/ErrorModal";

const API = "AIzaSyCZCR5mTjTlzy86hMyvps1-JcrDc015NxQ";

const reducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        status: "pending",
        message: "Loading...",
      };
    case "SUCCESS":
      return {
        status: "success",
        message: "Completed!",
      };
    case "ERROR":
      return {
        status: "error",
        message: action.message,
      };
    default:
      return {
        status: "",
        message: "",
      };
  }
};

const LoginForm = () => {
  const navigate = useNavigate();

  const [fetchState, dispatch] = useReducer(reducer, {
    status: null,
    message: null,
  });
  const handleClose = () => {
    dispatch({
      type: "",
    });
  };
  console.log(fetchState);
  const { onLogin } = useContext(LoginContext);

  const doWhat = "signIn";
  const handleLogin = async (e) => {
    e.preventDefault();
    const inputId = e.target[0].value;
    const inputPw = e.target[1].value;
    dispatch({ type: "PENDING" });
    let url;
    if (doWhat === "signUp") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`;
    } else if (doWhat === "signIn") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`;
    }
    const sendRequest = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: inputId,
          password: inputPw,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SUCCESS" });
        return data;
      } else {
        throw new Error(data.error.message);
      }
    };
    try {
      const responseData = await sendRequest();
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          id: responseData.email,
          idToken: responseData.idToken,
        })
      );
      onLogin();
      navigate("/");
    } catch (error) {
      dispatch({ type: "ERROR", message: String(error) });
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const loading = fetchState.status === "pending" && <Loading />;
  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      {fetchState.status === "error" && (
        <ErrorModal message={fetchState.message} handleClose={handleClose} />
      )}
      {loading}
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
        onClick={handleSignup}
      >
        회원가입
      </button>
    </form>
  );
};

export default LoginForm;
