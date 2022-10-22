import React, { useCallback, useRef, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { storage, firebaseConfig } from "../../store/firebase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import useFetch, { getProfile, postSignup } from "../../hooks/useFetch";
import InputForm from "../UI/InputForm";
import useScreen from "../../hooks/useScreen";

const SignupForm = () => {
  const { sendRequest, setFetchStateDefault, status, message } =
    useFetch(postSignup);

  // const [imgUrl, setImgUrl] = useState(null);
  const [tooltipMessage, setTooltipMessage] = useState({
    id: "",
    pw: "",
    name: "",
    nickname: "",
    number: "",
  });
  const turnOffAllTooltip = useCallback((e) => {
    setTooltipMessage({
      ...tooltipMessage,
      [e.target.id]: "",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    const pw = e.target[1].value;
    const name = e.target[2].value;
    const number = e.target[3].value;
    const nickname = e.target[4].value;
    // const photo = e.target[5].value;

    // 아이디 검사
    if (id === "") {
      setTooltipMessage({ ...tooltipMessage, id: "아이디를 입력해주세요" });
      return;
    }
    if (!id.includes("@") || !id.includes(".")) {
      setTooltipMessage({
        ...tooltipMessage,
        id: "이메일 형식으로 입력해주세요",
      });
      return;
    }
    // 비밀번호 검사
    if (pw.length < 6) {
      setTooltipMessage({
        ...tooltipMessage,
        pw: "비밀번호를 6자 이상 입력해주세요",
      });
      return;
    }
    // 이름 검사
    if (name === "") {
      setTooltipMessage({
        ...tooltipMessage,
        name: "이름을 입력해주세요",
      });
      return;
    }

    // 전화번호 검사
    if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(number)) {
      setTooltipMessage({
        ...tooltipMessage,
        number: "전화번호를 000-0000-0000형식으로 입력해주세요",
      });
      return;
    }
    // 닉네임 검사 ; 닉네임도 필수임, db에 저장해야 하기 때문
    if (nickname.length < 3) {
      setTooltipMessage({
        ...tooltipMessage,
        nickname: "3글자 이상의 닉네임을 입력해주세요",
      });
      return;
    }

    // 회원가입
    const { signupResponseData } = await sendRequest({
      signupData: {
        email: id,
        password: pw,
        displayName: nickname,
        returnSecureToken: true,
      },
      profileData: {
        nickname,
        name,
        number,
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

  const screen = useScreen({
    status,
    successMessage: "가입에 성공하였습니다!",
    errorMessage: message,
    setFetchStateDefault,
  });

  return (
    <div className="SignupForm">
      {screen}
      <InputForm
        handleSubmit={handleSubmit}
        tooltipMessage={tooltipMessage}
        turnOffAllTooltip={turnOffAllTooltip}
      />
    </div>
  );
};
export default React.memo(SignupForm);
