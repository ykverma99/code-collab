import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useUser from "./hooks/useUser";
import File from "./pages/File";
import Codes from "./pages/Codes";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/file/:id"
          element={!user ? <Navigate to={"/login"} /> : <File />}
        />
        <Route
          path="/codes"
          element={!user ? <Navigate to={"/login"} /> : <Codes />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
