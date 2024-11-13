import { AccountCircle } from "@mui/icons-material";
import "./Login.css";
import { Button, Checkbox, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container background-image">
      <div className="login-box">
        <div className="login-header">
          <AccountCircle className="login-icon" />
          <h2 className="login-title">Đăng nhập</h2>
        </div>
        <form>
        <TextField
          id="outlined-basic"
          label="Tài Khoản"
          variant="outlined"
          className="login-input"
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Mật Khẩu"
          variant="outlined"
          className="login-input"
        />
        </form>
        <div className="remember-me">
          <Checkbox />
          <label htmlFor="remember" className="remember-me-label" >
            Nhớ tài khoản
          </label>
        </div>
        <Button className="login-button">ĐĂNG NHẬP</Button>
        <p className="register-link">
          <Link to="/auth/register">Bạn chưa có tài khoản? Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}
