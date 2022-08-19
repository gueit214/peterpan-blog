import {
  BrowserRouter,
  Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./components/UI/Layout";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Search from "./pages/Search";
import "./App.scss";
import NewWrite from "./components/board/NewWrite";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/board" element={<Board />} />
          <Route path="/newwrite" element={<NewWrite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
