import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import { lazy, Suspense, useContext } from "react";
import LoginContext from "./store/login-context";
import PostDetail from "./pages/PostDetail";
import "./scss/App.scss";
import Playground from "./pages/Playground";

const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/Login"));
const Board = lazy(() => import("./pages/Board"));
const Search = lazy(() => import("./pages/Search"));
const WritePost = lazy(() => import("./pages/WritePost"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const NoAuth = lazy(() => import("./pages/NoAuth"));

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
              path="board/new"
              element={isLogin ? <WritePost isNewWrite={true} /> : <NoAuth />}
            />
            <Route
              path="board/:writeCount"
              element={isLogin ? <PostDetail /> : <NoAuth />}
            />
            <Route
              path="board/:postId/edit"
              element={isLogin ? <WritePost isNewWrite={false} /> : <NoAuth />}
            />

            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={isLogin ? <Profile /> : <NoAuth />}
            />
            <Route path="signup" element={<Signup />} />
            <Route path="playground" element={<Playground />} />
            <Route path="noauth" element={<NoAuth />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
