import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoggedInHeader from "../../components/LoggedInHeader/LoggedInHeader";
import { useSelector } from "react-redux";
import { PATH } from "../../routes/path";
import { useEffect } from "react";

export default function AuthLayout() {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current User:", currentUser);
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.maLoaiNguoiDung === "KhachHang") {
        navigate(PATH.HOME);
      } else {
        navigate(PATH.ADMIN);
      }
    }
  }, [navigate, currentUser]);

  return (
    <div>
      {currentUser ? <LoggedInHeader /> : <Header />}
      <Outlet />
    </div>
  );
}
