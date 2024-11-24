import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoggedInHeader from "../../components/LoggedInHeader/LoggedInHeader";
import { useSelector } from "react-redux";


export default function MainLayout() {
  const {currentUser} = useSelector((state) => state.auth);

  return (
    <div>
        {currentUser ? <LoggedInHeader /> : <Header />}
        <Outlet />
    </div>
  )
}
