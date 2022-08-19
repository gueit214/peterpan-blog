import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginContext from "../../store/login-context";

const Header = () => {
  const { isLogin, onLogout } = useContext(LoginContext);
  const handleLogout = () => {
    onLogout();
  };
  return (
    <header className="Header">
      <NavLink to="/main" className="title nav-link">
        Peterpan Blog
      </NavLink>

      <nav className="link-page">
        <ul className="nav nav-tabs">
          <li>
            <NavLink to="/main" className="nav-main nav-link">
              메인
            </NavLink>
          </li>
          <li>
            <NavLink to="/board" className="nav-board nav-link">
              게시판
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className="link-util">
        <ul className="nav nav-tabs">
          <li>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </li>
          <li>
            <NavLink to="/search" className="nav-search nav-link">
              검색
            </NavLink>
          </li>
          <li>
            {isLogin ? (
              <button className="nav-login nav-link" onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <NavLink to="/login" className="nav-login nav-link">
                로그인
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
