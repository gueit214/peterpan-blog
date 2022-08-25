import React, { useEffect, useState } from "react";
import AlertModal from "../components/UI/AlertModal";
const LoginContext = React.createContext({
  onLogin: () => {},
});

export const LoginContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);

  const checkLoginToken = () => {
    const loginInfoInLocal = localStorage.getItem("loginInfo");
    if (loginInfoInLocal) {
      setIsLogin(true);
    }
  };

  const onLogin = (idToken) => {
    const thisTime = Date.parse(new Date());
    const expireTime = thisTime + 3600000; //테스트로 1000이라 함 -> 바꿀예정
    localStorage.setItem("loginInfo", JSON.stringify({ idToken, expireTime }));
    setTimeout(() => {
      onLogout();
      setAlert(true);
    }, 3600000);
    setIsLogin(true);
  };
  const onLogout = () => {
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("displayName");
    setIsLogin(false);
  };

  const thisTime = Date.parse(new Date());
  const expireTimeInLocal = JSON.parse(
    localStorage.getItem("loginInfo")
  )?.expireTime;
  if (thisTime > expireTimeInLocal) {
    onLogout();
    setAlert(true);
  }

  useEffect(() => {
    checkLoginToken();
  }, []);

  const contextValue = {
    isLogin,
    onLogin,
    onLogout,
  };
  const alertScreen = (
    <AlertModal
      title="로그아웃"
      message="시간이 만료되어 자동 로그아웃 되었습니다."
      handleClose={() => {
        setAlert(false);
      }}
    />
  );

  return (
    <LoginContext.Provider value={contextValue}>
      {alert && alertScreen}
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
