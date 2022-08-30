import React from "react";
import { GoogleLogin } from "react-google-login";
// import { GoogleOAuthProvider } from "@react-oauth/google";

function Playground() {
  const clientId =
    "6136276275-gaabnsshn8qgo866jicfs18odhq8uq7r.apps.googleusercontent.com";

  async function onSuccess(res) {
    const profile = res.getBasicProfile();
    const userdata = {
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      name: profile.getName(),
    };
    // 로그인 성공 후 실행하기 원하는 코드 작성.
  }

  const onFailure = (res) => {
    console.log("err", res);
    alert("구글 로그인에 실패하였습니다");
  };
  return (
    <div>
      <GoogleLogin
        className="google-button"
        clientId={clientId}
        buttonText="Login with Google" // 버튼에 뜨는 텍스트
        onSuccess={onSuccess}
        onFailure={onFailure}
        // cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Playground;
