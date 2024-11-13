import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoggedInHeader from "../../components/Header/LoggedInHeader";


export default function MainLayout() {
  const isLoggedIn = false;

  return (
    <div>
        {isLoggedIn ? <LoggedInHeader /> : <Header />}
        <Outlet />
    </div>
  )
}
