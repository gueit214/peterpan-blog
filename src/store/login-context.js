import React, { useEffect, useState } from "react";
const LoginContext = React.createContext({
  onLogin: () => {},
});

export const LoginContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  const checkLoginToken = () => {
    const loginInfoInLocal = localStorage.getItem("loginInfo");
    if (loginInfoInLocal) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    checkLoginToken();
  }, []);
  const onLogin = (userInfo) => {
    localStorage.setItem(
      "loginInfo",
      JSON.stringify({ nickname: userInfo.nickname })
    );
  };
  const onLogout = () => {
    localStorage.removeItem("loginInfo");
  };

  const contextValue = {
    isLogin,
    onLogin,
    onLogout,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
