import { useCallback, useEffect, useReducer, useState } from "react";
import { firebaseConfig } from "../store/firebase";

const databaseURL = "https://peterpan-blog-default-rtdb.firebaseio.com";
const signupURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const loginURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const apiKey = firebaseConfig.apiKey;
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        status: "loading",
        message: "Wait .. Loading",
        data: null,
      };
    case "SUCCESS":
      return {
        status: "success",
        message: "Fetching Completed!",
        data: action.data,
      };
    case "ERROR":
      return {
        status: "error",
        message: action.message,
        data: null,
      };
    default:
      return {
        status: "default",
        message: null,
        data: null,
      };
  }
};

// 회원가입 fetch
export const postSignup = async (data) => {
  const signupResponse = await fetch(`${signupURL}${apiKey}`, {
    method: "POST",
    body: JSON.stringify(data.signupData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const signupResponseData = await signupResponse.json();
  if (!signupResponse.ok) {
    throw new Error(signupResponseData.error.message);
  }
  const profileResponse = await fetch(
    `${databaseURL}/profile/${data.profileData.nickname}.json`,
    {
      method: "POST",
      body: JSON.stringify(data.profileData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const profileResponseData = await profileResponse.json();
  if (!profileResponse.ok) {
    throw new Error(profileResponseData.error);
  }
  return;
};

// 로그인 fetch
export const loginFetch = async (data) => {
  const loginResponse = await fetch(`${loginURL}${apiKey}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const loginResponseData = await loginResponse.json();
  if (!loginResponse.ok) {
    throw new Error(loginResponseData.error.message);
  }
  return loginResponseData;
};

/**
 *
 * @param {function} fetchFunction
 * @returns {function} sendRequest, setFetchStateDefault
 * @returns {string} ...fetchState
 */

const useFetch = (fetchFunction) => {
  const [fetchState, dispatch] = useReducer(reducer, {
    status: "default",
    message: null,
    data: null,
  });
  const setFetchStateDefault = () => {
    dispatch({ type: "" });
  };
  const sendRequest = useCallback(async (data) => {
    dispatch({ type: "LOADING" });
    try {
      const responseData = await fetchFunction(data);
      // console.log(responseData);
      dispatch({ type: "SUCCESS", data: responseData });
    } catch (error) {
      dispatch({
        type: "ERROR",
        message: String(error) || "Something went wrong!",
      });
    }
    return;
  }, []);
  return { sendRequest, ...fetchState, setFetchStateDefault };
};
export default useFetch;
