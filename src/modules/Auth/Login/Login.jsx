import { AccountCircle } from "@mui/icons-material";
import "./Login.css";
import { Button, Checkbox, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { loginApi } from "../../../store/slices/authSlice";
import toast from "react-hot-toast";
import { PATH } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";


const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
})

export default function Login() {
  const { dispatch, navigate } = useAuth();
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })
  
  const onSubmit = (data) => {
    dispatch(loginApi(data))
      .unwrap() 
      .then((payload) => {
        // Kiểm tra cấu trúc payload trả về
        if (payload && payload.content) {
          toast.success("Đăng nhập thành công");
          localStorage.setItem("currentUser", JSON.stringify(payload.content));
          
          const userType = payload.content.maLoaiNguoiDung;
          if (userType === "KhachHang") {
            navigate(PATH.HOME);
          } else {
            navigate(PATH.ADMIN);
          }
        } else {
          toast.error(payload.message || "Đăng nhập thất bại, vui lòng thử lại.");
        }
      })
      .catch((error) => {
        // Xử lý lỗi từ server hoặc mạng
        const errorMessage = error.response?.data?.message || error.message || "Đăng nhập thất bại, vui lòng thử lại.";
        toast.error(errorMessage);
      });
  };
  
  return (
    <div className="login-container background-image">
      <div className="login-box">
        <div className="login-header">
          <AccountCircle className="login-icon" />
          <h2 className="login-title">Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            label="Tài Khoản"
            variant="outlined"
            className="login-input"
            style={{ marginBottom: "20px" }}
            {...register("taiKhoan")}
            error={!!errors.taiKhoan}
            helperText={errors.taiKhoan?.message}
          />
          <TextField
            id="outlined-basic"
            label="Mật Khẩu"
            variant="outlined"
            className="login-input"
            {...register("matKhau")}
            error={!!errors.matKhau}
            helperText={errors.matKhau?.message}
          />
          <div className="remember-me">
            <Checkbox />
            <label htmlFor="remember" className="remember-me-label">
              Nhớ tài khoản
            </label>
          </div>
          <Button type="submit" className="login-button">ĐĂNG NHẬP</Button>
        </form>
        <p className="register-link">
          <Link to="/auth/register">Bạn chưa có tài khoản? Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}
