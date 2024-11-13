import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";


export default function AuthLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}