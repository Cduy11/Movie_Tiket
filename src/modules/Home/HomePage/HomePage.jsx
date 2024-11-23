import {
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  Typography,
  Grid,
  Pagination,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import Banner from "../../../components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { listMoviePagination } from "../../../store/slices/homeSlice";
import { listCinemaComplexApi } from "../../../store/slices/cinemaSlice";

import useCinemaData from "../../../hooks/useCinemaData";
import useTabPanel from "../../../hooks/useTabPanel";

import Loading from "../../../components/Loading/Loading";
import "./HomePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // custom hook
  useTabPanel();
  const {
    cinemaData,
    cinema,
    movieTime,
    selectedCinema,
    setSelectedCinema,
    selectedCinemaId,
    setSelectedCinemaId,
  } = useCinemaData();

  const [page, setPage] = useState(1);
  const { movies: movieList, isLoading } = useSelector((state) => state.home);
  const movies = movieList?.items || [];

  const [group] = useState("GP01");
  const [pageSize] = useState(8);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [value, setValue] = useState(0);

  // Fetch dữ liệu phim và rạp phim
  useEffect(() => {
    dispatch(listMoviePagination({ group, page, pageSize }));
    dispatch(listCinemaComplexApi());
  }, [dispatch, group, page, pageSize]);

  // Xử lý thay đổi tab (chọn hệ thống rạp phim)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCinemaId = cinemaData[newValue]?.maHeThongRap;

    if (selectedCinemaId) {
      setSelectedCinema(selectedCinemaId);
    }
  };

  const handleBuyTicket = (maPhim) => {
    navigate(`/booking/${maPhim}`);
  };


  return (
    <>
      <Banner />
      <div className="movie-list"></div>
      {/* search */}
      <div className="filter-container">
        <Select defaultValue="" displayEmpty className="filter-select">
          <MenuItem value="" disabled>
            Phim
          </MenuItem>
          <MenuItem value="1">TAM VE ĐEN THIEN ĐƯỜNG</MenuItem>
        </Select>
        <Select defaultValue="" displayEmpty className="filter-select">
          <MenuItem value="" disabled>
            Rạp
          </MenuItem>
        </Select>
        <Select defaultValue="" displayEmpty className="filter-select">
          <MenuItem value="" disabled>
            Ngày giờ chiếu
          </MenuItem>
        </Select>
        <Button variant="contained" className="buy-ticket-button">
          <Link to={PATH.BookingSeat}>MUA VÉ NGAY</Link>
        </Button>
      </div>
      {/* List Movies */}
      <div className="container">
        <div className="movies-container">
          {isLoading ? (
            <Loading />
          ) : (
            <Grid container>
              {movies.map((movie, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    className="movie-card"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={movie.hinhAnh}
                      alt={movie.tenPhim}
                      className="movie-image"
                    />
                    <div className="movie-content">
                      <CardContent>
                        {hoveredIndex === index ? (
                               <Button
                               variant="contained"
                               className="buy-ticket-button"
                               onClick={() => handleBuyTicket(movie.maPhim)}
                             >
                               <span className="buy-ticket-title">
                                 {" "}
                                 MUA VÉ NGAY{" "}
                               </span>
                             </Button>
                        ) : (
                          <>
                            <Typography
                              gutterBottom
                              component="div"
                              className="movie-title"
                              fontWeight="bold"
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {movie.tenPhim.length > 20
                                ? movie.tenPhim.slice(0, 20) + "..."
                                : movie.tenPhim}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              className="movie-description"
                              style={{ minHeight: "40px" }}
                            >
                              {movie.moTa.slice(0, 50)}
                              {movie.moTa.length > 50 ? "..." : ""}
                            </Typography>
                          </>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>

        <div className="pagination-controls">
          <Pagination
            count={3}
            page={page}
            onChange={(event, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        </div>
      </div>

      {/* Cinema Complex */}
      <div className="container">
        <div className="cumRap">
          <div className="p-4">
           <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: "auto",
              }}
            >
              {/* Tabs for Cinema Systems */}
              <Tabs
                orientation="vertical"
                variant="scr ollable"
                value={value}
                onChange={handleChange}
                aria-label="Danh sách hệ thống rạp"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {cinemaData.map((cinema, index) => (
                  <Tab
                    key={index}
                    label={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={cinema.logo}
                          alt={cinema.tenHeThongRap}
                          style={{ width: "50px", marginRight: "8px" }}
                        />
                        {cinema.tenHeThongRap}
                      </div>
                    }
                  />
                ))}
              </Tabs>

              {/* Cinema Information */}
              <div
                className="cinema-info"
                style={{
                  padding: "16px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  maxWidth: "300px",
                }}
              >
                {cinema.map((cinemas, index) => (
                  <div
                    key={index}
                    className="cinema-card"
                    onClick={() => setSelectedCinemaId(cinemas.maCumRap)} 
                  >
                    <Typography variant="body2" className="cinema-name">
                      {cinemas.tenCumRap}
                    </Typography>
                    <Typography variant="body2" className="cinema-address">
                      {cinemas.diaChi}
                    </Typography>
                  </div>
                ))}
              </div>

              {/* Showtimes */}
              <div className="showtime-info">
                {movieTime
                  .filter(
                    (cinemaSystem) =>
                      cinemaSystem.maHeThongRap === selectedCinema
                  )
                  .map((cinemaSystem) =>
                    cinemaSystem.lstCumRap.map((cinemaHall) =>
                      cinemaHall.danhSachPhim.map((movie, movieIndex) => {
                        if (cinemaHall.maCumRap === selectedCinemaId) {
                          return (
                            <div key={movieIndex} className="movie_item_cinema">
                              <img
                                src={movie.hinhAnh}
                                alt={movie.tenPhim}
                                className="movie_image_cinema"
                              />
                              <div className="movie_details">
                                <Typography className="movie_title_cinema">
                                  {movie.tenPhim}
                                </Typography>
                                <div className="showtime-buttons">
                                  <div className="showtime-column">
                                    {movie.lstLichChieuTheoPhim
                                      .slice(0, 2)
                                      .map((info, infoIndex) => (
                                        <Link to={`/booking-seat/${info.maLichChieu}`} key={infoIndex}>
                                          <Button className="showtime_cinema">
                                            <span style={{ color: "green" }}>
                                              {format(
                                                new Date(info.ngayChieuGioChieu),
                                                "dd/MM/yyyy",
                                                { locale: vi }
                                              )}
                                            </span>
                                            <span
                                              style={{
                                                color: "red",
                                                marginLeft: "10px",
                                              }}
                                            >
                                              {format(
                                                new Date(info.ngayChieuGioChieu),
                                                "HH:mm",
                                                { locale: vi }
                                              )}
                                            </span>
                                          </Button>
                                        </Link>
                                      ))}
                                  </div>
                                  <div className="showtime-column">
                                    {movie.lstLichChieuTheoPhim
                                      .slice(2, 4)
                                      .map((info, infoIndex) => (
                                        <Link to={`/booking-seat/${info.maLichChieu}`} key={infoIndex}>
                                          <Button
                                          key={infoIndex}
                                          className="showtime_cinema"
                                          
                                        >
                                          <span style={{ color: "green" }}>
                                            {format(
                                              new Date(info.ngayChieuGioChieu),
                                              "dd/MM/yyyy",
                                              { locale: vi }
                                            )}
                                          </span>
                                          <span
                                            style={{
                                              color: "red",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            {format(
                                              new Date(info.ngayChieuGioChieu),
                                              "HH:mm",
                                              { locale: vi }
                                            )}
                                          </span>
                                        </Button>
                                        </Link>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    )
                  )}
              </div>
            </Box>
          </div>
        </div>
      </div>

      {/* app  */}
      <div className="app-container">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            className="flex justify-center items-center app-content"
          >
            <div className="text-center">
              <h2 className="app-title">
                Ứng dụng tiện lợi <br /> dành cho người yêu điện ảnh
              </h2>
              <p className="app-description">
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <a
                href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                className="app-button"
              >
                APP MIỄN PHÍ - TẢI VỀ NGAY!
              </a>
              <p>
                TIX có hai phiên bản{" "}
                <a href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197">
                  {" "}
                  IOS
                </a>{" "}
                &{" "}
                <a href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123">
                  {" "}
                  ANDROID
                </a>
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="flex justify-center items-center app-content"
          >
            <img
              src="/src/assets/img/tải xuống.png"
              alt="App Preview"
              className="w-full h-auto app-img"
            />
            <Grid
              item
              xs={12}
              md={6}
              className="flex justify-center items-center app-content"
            >
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <img
                    src="/src/assets/img/banner-slider-6.0b2b382d.jpg"
                    alt="App Preview"
                    className="w-full h-auto app-img-carousel"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/src/assets/img/banner-slider-3.33a486d1.jpg"
                    alt="App Preview"
                    className="w-full h-auto app-img-carousel"
                  />
                </SwiperSlide>
              </Swiper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
