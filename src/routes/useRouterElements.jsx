import { useRoutes } from "react-router-dom"
import { PATH } from "./path"
import Login from "../modules/Auth/Login/Login"
import AuthLayout from "../layouts/AuthLayout/AuthLayout"
import Register from "../modules/Auth/Register/Register"


export default function useRouterElements() {
  const element = useRoutes([
    {
      path: PATH.AUTH,
      element: <AuthLayout/>,
      children: [
        {
          path: PATH.LOGIN,
          element: <Login/>
        }, 
        {
          path: PATH.REGISTER,
          element: <Register/>
        }
      ]
    }
  ])
  return (
   element
  )
}
