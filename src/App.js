import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import { lazy, Suspense, useContext } from "react";
import LoginContext from "./store/login-context";
import NoAuth from "./components/UI/NoAuth";
import PostDetail from "./pages/PostDetail";
import "./scss/App.scss";

const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/Login"));
const Board = lazy(() => import("./pages/Board"));
const Search = lazy(() => import("./pages/Search"));
const NewWrite = lazy(() => import("./pages/NewWrite"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const { isLogin } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="main" element={<Main />} />
            <Route path="board" element={isLogin ? <Board /> : <NoAuth />} />
            <Route
              path="board/:boardName/:id"
              element={isLogin ? <PostDetail /> : <NoAuth />}
            />
            <Route
              path="newwrite"
              element={isLogin ? <NewWrite /> : <NoAuth />}
            />
            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={isLogin ? <Profile /> : <NoAuth />}
            />
            <Route path="signup" element={<Signup />} />
            <Route path="search" element={<Search />} />
            <Route path="noauth" element={<NoAuth />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
