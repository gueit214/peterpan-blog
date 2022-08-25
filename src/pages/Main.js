import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="Main">
      <h1>Welcome to Main PeterPen Website!</h1>
      <section className="link">
        <Link to="/board" className="link-board">
          게시판 바로가기
        </Link>
      </section>
    </div>
  );
};

export default Main;
