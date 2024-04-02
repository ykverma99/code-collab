import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useUser from "./hooks/useUser";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
