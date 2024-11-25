import { TextField, Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import "./Register.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerApi } from "../../../store/slices/authSlice";
import toast from "react-hot-toast";
import { PATH } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";

// Cập nhật schema Yup với các trường mới
const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
  nhapLaiMatKhau: yup.string()
    .oneOf([yup.ref('matKhau'), null], "Mật khẩu nhập lại không khớp")
    .required("Nhập lại mật khẩu không được để trống"),
  hoTen: yup.string().required("Họ tên không được để trống"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDt: yup.string().required("Số điện thoại không được để trống"),
  maNhom: yup.string().required("Mã nhóm không được để trống"),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch, navigate, isLoading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
       dispatch(registerApi(data));
      toast.success("Đăng ký thành công!");
      navigate(PATH.LOGIN);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-container background-image">
      <div className="register-box">
        <div className="register-header">
          <HttpsIcon className="login-icon" />
          <h2 className="login-title">Đăng ký</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("taiKhoan")}
            label="Tài Khoản"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.taiKhoan}
            helperText={errors.taiKhoan?.message}
          />
          <TextField
            {...register("matKhau")}
            label="Mật Khẩu"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            error={!!errors.matKhau}
            helperText={errors.matKhau?.message}
          />
          <TextField
            {...register("nhapLaiMatKhau")}
            label="Nhập lại mật khẩu"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            error={!!errors.nhapLaiMatKhau}
            helperText={errors.nhapLaiMatKhau?.message}
          />
          <TextField
            {...register("hoTen")}
            label="Họ Tên"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.hoTen}
            helperText={errors.hoTen?.message}
          />
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("soDt")}
            label="Số Điện Thoại"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.soDt}
            helperText={errors.soDt?.message}
          />
          <TextField
            {...register("maNhom")}
            label="Mã Nhóm"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.maNhom}
            helperText={errors.maNhom?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "ĐĂNG KÝ"}
          </Button>
        </form>
        <p className="register-link">
          <Link to="/auth/login">
            <span className="text-blue-500">Bạn đã có tài khoản?</span> Đăng nhập
          </Link>
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
