import { Box, Button, Tab, Tabs, Typography, Card, CardContent } from "@mui/material";
import "./Booking.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getShowTimeMovieSystemApi } from "../../../store/slices/cinemaSlice";

export default function Booking() {
  const { maPhim } = useParams();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const { showTimeMovieSystem } = useSelector((state) => state.cinema);
  const showCinema = showTimeMovieSystem?.heThongRapChieu || [];
  console.log("showCinema:", showCinema);

  const [value, setValue] = useState(0);
  const [selectedCinema, setSelectedCinema] = useState(null);

  // Gọi API khi `maPhim` thay đổi
  useEffect(() => {
    if (maPhim) {
      dispatch(getShowTimeMovieSystemApi({ maPhim }));
    }
  }, [dispatch, maPhim]);

  // Xử lý khi bấm vào Tab
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    const selected = showCinema[newValue];
    setSelectedCinema(selected);
    console.log("Selected Cinema:", selected);
  };

  return (
    <div className="bg-gray-900 text-white p-8 container-booking">
      <div className="container">
        {/* Dữ liệu phim */}
        {showTimeMovieSystem && typeof showTimeMovieSystem === "object" ? (
          <div className="booking-wrapper" key={showTimeMovieSystem.maPhim}>
            <div className="image-container">
              <img
                src={showTimeMovieSystem.hinhAnh}
                alt="Movie Poster"
                className="w-64 h-auto"
              />
            </div>
            <div className="booking-info">
              <Typography variant="h5" className="booking-title font-bold">
                {showTimeMovieSystem.tenPhim}
              </Typography>
              <Typography variant="subtitle2">120 phút</Typography>
              <Button
                variant="contained"
                color="primary"
                className="booking-btn"
              >
                Đặt lịch
              </Button>
            </div>
            <div className="booking-review">
              <Typography className="booking-review-title">
                {showTimeMovieSystem.danhGia}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="h6">Không có dữ liệu để hiển thị.</Typography>
        )}
      </div>

      {/* Tabs hệ thống rạp */}
      <div className="container">
        <div className="cinema-tabs">
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              height: "auto",
            }}
          >
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleTabChange}
            >
              {showCinema && showCinema.length > 0 ? (
                showCinema.map((cinema, index) => (
                  <Tab
                    key={index}
                    label={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={cinema.logo}
                          alt={cinema.tenHeThongRap}
                          style={{ width: "50px", marginRight: "8px" }}
                        />
                      </div>
                    }
                  />
                ))
              ) : (
                <Typography variant="h6" className="text-center">
                  Phim này không có rạp chiếu.
                </Typography>
              )}
            </Tabs>
            {/* Hiển thị thông tin cụm rạp */}
            <Box
              sx={{  padding: "16px" }}
              className="cinema-schedule"
            >
              <div className="cinema-info">
              {selectedCinema?.cumRapChieu?.length > 0 ? (
                selectedCinema.cumRapChieu.map((cumRap, index) => (
                  <Card key={index} className="cinema-card-booking" variant="outlined">
                    <CardContent  className="cinema-content">
                      <Typography
                        variant="subtitle1"
                        className="font-bold cinema-name"
                      >
                        {cumRap.tenCumRap}
                      </Typography>
                      {cumRap.lichChieuPhim?.length > 0 ? (
                        // Tạo bản sao của mảng và sắp xếp
                        [...cumRap.lichChieuPhim]
                          .sort((a, b) => new Date(a.ngayChieuGioChieu) - new Date(b.ngayChieuGioChieu))
                          .slice(0, 4) 
                          .map((lichChieu, idx) => (
                            <Button key={idx} variant="body2" className="showtime">
                              {` Giờ chiếu: ${new Date(
                                lichChieu.ngayChieuGioChieu
                              ).toLocaleString()}`}
                            </Button>
                          ))
                      ) : (
                        <Typography variant="body2" className="no-showtime">
                          Không có lịch chiếu
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" className="no-cinema">
                  Không có cụm rạp
                </Typography>
              )}
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
