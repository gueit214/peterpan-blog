import { useCallback, useEffect, useReducer, useState } from "react";
import { firebaseConfig } from "../store/firebase";

const databaseURL = "https://peterpan-blog-default-rtdb.firebaseio.com";
const signupURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const loginURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const getProfileURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=";
const updateProfileURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";
const changePasswordURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";
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
  return { signupResponseData, profileResponseData };
};

// profile 받기
export const getAllProfile = async () => {
  const profileResponse = await fetch(`${databaseURL}/profile.json`);
  const profileResponseData = await profileResponse.json();
  if (!profileResponse.ok) {
    throw new Error(profileResponseData.error);
  }
  return profileResponseData;
};

// 내가 원하는 profile 받기
export const getProfileFromDatabase = async (nickname) => {
  const profileResponse = await fetch(
    `${databaseURL}/profile/${nickname}.json`
  );
  const profileResponseData = await profileResponse.json();
  if (!profileResponse.ok) {
    throw new Error(profileResponseData.error);
  }
  return profileResponseData;
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

// 프로필 fetch
export const getProfileFetchFromAuth = async (data) => {
  const getProfileResponse = await fetch(`${getProfileURL}${apiKey}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getProfileResponseData = await getProfileResponse.json();
  if (!getProfileResponse.ok) {
    throw new Error(getProfileResponseData.error.message);
  }
  return getProfileResponseData;
};

// 프로필 업데이트
export const updateProfileFetch = async (data) => {
  const updateProfileResponse = await fetch(`${updateProfileURL}${apiKey}`, {
    method: "POST",
    body: JSON.stringify(data.profileData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updateProfileResponseData = await updateProfileResponse.json();
  if (!updateProfileResponse.ok) {
    throw new Error(updateProfileResponseData.error.message);
  }
  const changePasswordResponse = await fetch(`${changePasswordURL}${apiKey}`, {
    method: "POST",
    body: JSON.stringify(data.passwordData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const changePasswordResponseData = await changePasswordResponse.json();
  if (!changePasswordResponse.ok) {
    throw new Error(changePasswordResponseData.error.message);
  }

  return { updateProfileResponseData, changePasswordResponseData };
};

//------------------------------------------------------------------------------
// board 불러오기
export const getPostList = async () => {
  const response = await fetch(
    `https://peterpan-blog-default-rtdb.firebaseio.com/board.json`
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error.message);
  }
  return responseData;
};

// post 새로쓰기
export const writeNewPost = async (data) => {
  const responseCount = await fetch(
    `https://peterpan-blog-default-rtdb.firebaseio.com/writeCount.json`
  );
  const responseCountData = await responseCount.json();
  if (!responseCount.ok) {
    throw new Error(responseCountData.error.message);
  }

  const responseCountPlus = await fetch(
    `https://peterpan-blog-default-rtdb.firebaseio.com/writeCount.json`,
    {
      method: "PUT",
      body: JSON.stringify(responseCountData + 1),
    }
  );
  const responseCountPlusData = await responseCountPlus.json();
  if (!responseCountPlus.ok) {
    throw new Error(responseCountPlusData.error.message);
  }

  const response = await fetch(
    `https://peterpan-blog-default-rtdb.firebaseio.com/board.json`,
    {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        date: data.date,
        nickname: data.nickname,
        writeCount: responseCountData + 1,
        board: data.board,
      }),
    }
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error.message);
  }
  return responseCountData;
};

// POST 수정하기
export const writeEditPost = async (data) => {
  console.log(data.postId);
  const response = await fetch(
    `https://peterpan-blog-default-rtdb.firebaseio.com/board/${data.postId}.json`,
    {
      method: "PUT",
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        date: data.date,
        nickname: data.nickname,
        board: data.board,
        writeCount: data.writeCount,
      }),
    }
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error.message);
  }
  return;
};

// board 삭제
export const deletePostList = async (postId) => {
  const response = await fetch(
    `https://peterpan-blog-default-rtdb.firebaseio.com/board/${postId}.json`,
    {
      method: "DELETE",
    }
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.error.message);
  }
  return responseData;
};

// board 수정

// boardDetail 불러오기
// export const getPostDetail = async () => {
//   const response = await fetch(
//     `https://peterpan-blog-default-rtdb.firebaseio.com/board.json`
//   );
//   const responseData = await response.json();
//   if (!response.ok) {
//     throw new Error(responseData.error.message);
//   }
//   return responseData;
// };

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
      dispatch({ type: "SUCCESS", data: responseData });
      return responseData;
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
