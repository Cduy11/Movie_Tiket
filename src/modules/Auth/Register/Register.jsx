import { TextField, Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import "./Register.css";
import { Link } from "react-router-dom";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container background-image">
      <div className="register-box">
        <div className="register-header">
          <HttpsIcon className="login-icon" />
          <h2 className="login-title">Đăng ký</h2>
        </div>
        <form>
          <TextField
            label="Tài Khoản"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
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
          />
          <TextField
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
          />
          <TextField
            label="Họ Tên"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="register-button"
          >
            ĐĂNG KÝ
          </Button>
        </form>
        <p className="register-link">
          <Link to="/auth/login">
            {" "}
            <span className="text-blue-500"> Bạn đã có tài khoản? </span>Đăng
            nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
