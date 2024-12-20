import { AppBar, Toolbar, IconButton } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { PATH } from "../../routes/path";
import "./Header.css";

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className="flex justify-between px-8 header-container">
        {/* Logo */}
        <div className="flex items-center header-logo">
          <img
            src="https://www.cybersoft.edu.vn/images/logo.png"
            alt="Logo"
            className="h-10 mr-2"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 header-nav">
          <Link to={PATH.HOME} className="text-black">Lịch Chiếu</Link>
          <Link to={PATH.HOME} className="text-black"> Cụm Rạp</Link>
          <Link to={PATH.HOME} className="text-black"> Tin Tức</Link>
          <Link to={PATH.HOME} className="text-black"> Ứng Dụng</Link>
        </div>

        {/* Login and Register */}
        <div className="flex items-center space-x-6">
          <Link to={PATH.LOGIN} className="flex items-center text-black">
            <IconButton className="items-center-icons">
              <PersonOutline />
            </IconButton>
            <span className="text-lg">Đăng Nhập</span>
          </Link>
          <div className="border-r border-gray-300 h-8 mx-4"></div>
          <Link to={PATH.REGISTER} className="flex items-center text-black">
            <IconButton className="items-center-icons">
              <PersonOutline />
            </IconButton>
            <span className="text-lg">Đăng Ký</span>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
