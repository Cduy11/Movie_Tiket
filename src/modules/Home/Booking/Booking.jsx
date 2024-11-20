import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import "./Booking.css";
import { useState } from "react";

export default function Booking({ maPhim }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    s;
    setValue(newValue);
  };

  const handleBuyTicket = (cinemaName, showtime) => {
    // Xử lý mua vé
  };

  const cinemaData = [
    {
      cinemaName: "Rạp 1",
      showtimes: [
        { date: "2023-10-01", time: "10:00", status: "available" },
        { date: "2023-10-01", time: "12:00", status: "sold-out" },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 text-white p-8 container-booking">
      <div className="container">
        {/* Dữ liệu phim */}
        {cinemaData.map((cinema) => (
          <div className="booking-wrapper" key={cinema.cinemaName}>
            <div className="image-container">
              <img
                src="/src/assets/img/one-piece-stampede_gp09.jpg"
                alt="Movie Poster"
                className="w-64 h-auto"
              />
            </div>
            <div className="booking-info">
              <Typography variant="h5" className="booking-title font-bold">
                {cinema.cinemaName}
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
              <Typography variant="h6" className="booking-review-title">
                10
              </Typography>
            </div>

            <Box className="booking-showtimes">
              {cinema.showtimes.map((showtime, idx) => (
                <Button
                  key={idx}
                  className={`booking-showtime ${
                    showtime.status === "available"
                      ? "booking-showtime-available"
                      : "booking-showtime-soldout"
                  }`}
                  disabled={showtime.status === "sold-out"}
                  onClick={() => handleBuyTicket(cinema.cinemaName, showtime)}
                >
                </Button>
              ))}
            </Box>
          </div>
        ))}

        {/* Thêm Tabs */}
        <Box
          className="booking-cinema-container mt-7"
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "auto",
          }}
        >
          <Tabs
            onChange={handleChange}
            aria-label="cinema tabs"
            className="booking-tabs"
            orientation="vertical"
            variant="scrollable"
            value={value}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {cinemaData.map((cinema, index) => (
              <Tab
                key={index}
                label={cinema.cinemaName}
                className="booking-tab"
              />
            ))}
          </Tabs>

          <div className="booking-details">
            {cinemaData[value] && (
              <Card className="booking-card">
                <CardContent>
                  <Typography variant="h6" className="booking-cinema-name">
                    {cinemaData[value].cinemaName}
                  </Typography>
                  <Box className="booking-showtimes">
                    {cinemaData[value].showtimes.map((showtime, idx) => (
                      <Button
                        key={idx}
                      className={`booking-showtime ${
                        showtime.status === "available"
                          ? "booking-showtime-available"
                          : "booking-showtime-soldout"
                      }`}
                      disabled={showtime.status === "sold-out"}
                      onClick={() =>
                        handleBuyTicket(
                          cinemaData[value].cinemaName,
                          showtime
                        )
                      }
                    >
                      {showtime.date} ~ {showtime.time}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}
