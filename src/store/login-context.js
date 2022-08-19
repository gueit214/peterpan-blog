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
  const onLogin = () => {
    setIsLogin(true);
  };
  const onLogout = () => {
    localStorage.removeItem("loginInfo");
    setIsLogin(false);
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
