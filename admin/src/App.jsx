import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import User from "./pages/User/User";
import Login from "./pages/auth/Login/Login";
import Signup from "./pages/auth/Signup/Signup";
import AuthPage from "./pages/auth/AuthPage";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext/UserContext";
import { ToastContainer } from "react-toastify";
import OrderPage from "./pages/Orders/OrderPage";
import ItemPage from "./pages/Items/ItemPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const contxtUser = useContext(UserContext);
  const { currentUser, setCurrentUser, token, setToken } = contxtUser;
  useEffect(() => {
    const cUser = localStorage.getItem("user");
    const cToken = localStorage.getItem("token");
    setCurrentUser(cUser);
    setToken(cToken);
  }, [token, currentUser]);

  return (
    <div>
      {token?.length > 0 && <Nav />}
      {token?.length > 0 ? (
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<User />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/items" element={<ItemPage />} />
            <Route path="*" element={<Navigate to="/users" />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route element={<AuthPage />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
