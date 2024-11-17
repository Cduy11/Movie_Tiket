import "./Loading.css";
import logo from "../../assets/img/0b206049209988c6d68dd4ed83840f56.gif";
export default function Loading() {
  return (
    <div className="container_loading" style={{ backgroundColor: "#fcfcfc" }}>
      <img
        src={logo}
        alt="mmm"
        style={{ height: 180, width: 180 }}
        className="loading-gif"
      />
    </div>
  );
}
