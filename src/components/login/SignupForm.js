import React, { useEffect, useReducer, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { storage, firebaseConfig } from "../../store/firebase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../UI/ProfileForm";
import useFetch, { postSignup } from "../../hooks/useFetch";
import Loading from "../UI/Loading";
import AlertModal from "../UI/AlertModal";

const SignupForm = () => {
  const navigate = useNavigate();
  const { sendRequest, setFetchStateDefault, status, message } =
    useFetch(postSignup);

  // const [imgUrl, setImgUrl] = useState(null);
  const [isShowTooltipNickname, setIsShowTooltipNickname] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    const pw = e.target[1].value;
    const name = e.target[2].value;
    const nickname = e.target[3].value;
    const number = e.target[4].value;
    // const photo = e.target[5].value;
    const checkConfigureOfAlpha = /^[a-z|A-Z]+$/;

    if (!checkConfigureOfAlpha.test(nickname)) {
      setIsShowTooltipNickname(true);
      return;
    }

    // 회원가입
    await sendRequest({
      signupData: {
        email: id,
        password: pw,
        displayName: nickname,
        returnSecureToken: true,
      },
      profileData: {
        id: id,
        name: name,
        nickname: nickname,
        number: number,
        // photo: imgUrl,
      },
    });

    // 사진 파일 업로드
    // const file = e.target[5];
    // if (!file) return;
    // const storageRef = ref(storage, `assets/${e.target[3].value}/${file.name}`);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setImgUrl(downloadURL);
    //     });
    //   }
    // );
  };
  const turnOffShowtoolTipNickname = () => {
    setIsShowTooltipNickname(false);
  };

  console.log(status);
  const successScreen = status === "success" && (
    <AlertModal
      title="축하합니다!"
      message={"가입에 성공하였습니다!"}
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
    <div>
      {loadingScreen}
      {errorScreen}
      {successScreen}
      <ProfileForm
        handleSubmit={handleSubmit}
        isShowTooltipNickname={isShowTooltipNickname}
        turnOffShowtoolTipNickname={turnOffShowtoolTipNickname}
      />
    </div>
  );
};

export default SignupForm;
