import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Search from "./pages/Search";
import NewWrite from "./pages/NewWrite";
import { useContext } from "react";
import LoginContext from "./store/login-context";
import NoAuth from "./components/UI/NoAuth";
import PostDetail from "./pages/PostDetail";
import "./scss/App.scss";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  const { isLogin } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="board" element={isLogin ? <Board /> : <NoAuth />} />
          <Route
            path="board/post/:id"
            element={isLogin ? <PostDetail /> : <NoAuth />}
          />
          <Route
            path="newwrite"
            element={isLogin ? <NewWrite /> : <NoAuth />}
          />
          <Route path="login" element={<Login />} />
          <Route
            path="profile/:nickname"
            element={isLogin ? <Profile /> : <NoAuth />}
          />
          <Route path="signup" element={<Signup />} />
          <Route path="search" element={<Search />} />
          <Route path="noauth" element={<NoAuth />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
