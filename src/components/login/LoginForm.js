import React, { useContext, useReducer, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginContext from "../../store/login-context";
import { useNavigate } from "react-router-dom";

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
  const idRef = useRef();
  const pwRef = useRef();

  const [fetchState, dispatch] = useReducer(reducer, {
    status: null,
    message: null,
  });
  const handleClose = () => {
    dispatch({
      type: "",
    });
  };
  const { onLogin } = useContext(LoginContext);

  const doWhat = "signIn";
  const handleLogin = async (e) => {
    e.preventDefault();
    const inputId = idRef.current.value;
    const inputPw = pwRef.current.value;
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
        return;
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
  const errorModal = (
    <Modal show={fetchState.status === "error"} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{fetchState.status}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{fetchState.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const loading = fetchState.status === "pending" && (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
  return (
    <form className="LoginForm" onSubmit={handleLogin}>
      {errorModal}
      {loading}
      <div className="input-group mb-3">
        <label className="input-group-text">id</label>
        <input type="id" className="form-control" ref={idRef} />
      </div>
      <div className="input-group">
        <label className="input-group-text">password</label>
        <input type="password" className="form-control" ref={pwRef} />
      </div>
      <button type="submit" className="btn-login btn btn-outline-success">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
