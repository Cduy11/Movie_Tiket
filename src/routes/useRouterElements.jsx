import { useRoutes } from "react-router-dom";
import { PATH } from "./path";
import Login from "../modules/Auth/Login/Login";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../modules/Auth/Register/Register";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../modules/Home/HomePage/HomePage";
import Booking from "../modules/Home/Booking/Booking";
import BookingSeat from "../modules/Home/BookingSeat/BookingSeat";


export default function useRouterElements() {
  const element = useRoutes([
    // auth
    {
      path: PATH.AUTH,
      element: <AuthLayout />,
      children: [
        {
          path: PATH.LOGIN,
          element: <Login />,
        },
        {
          path: PATH.REGISTER,
          element: <Register />,
        },
      ],
    },

    // home
    {
      path: PATH.HOME,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: PATH.Booking,
          element: <Booking />,
        },
        {
          path: PATH.BookingSeat,
          element: <BookingSeat />,
        }
      ],
    },
  ]);
  return element;
}
