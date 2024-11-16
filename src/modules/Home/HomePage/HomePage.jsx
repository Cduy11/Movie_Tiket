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
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { listMoviePagination } from "../../../store/slices/homeSlice";
import useTabPanel from "../../../hooks/useTabPanel";
import { listCinemaComplexApi } from "../../../store/slices/listCinemaSlice";
import { listCinemaSystemApi } from "../../../store/slices/listCinemaSystem";

export default function HomePage() {
  const { TabPanel, a11yProps } = useTabPanel();
  const dispatch = useDispatch();
  const {
    movies: movieList,
    isLoading,
    error,
  } = useSelector((state) => state.home);
  const movies = movieList?.items || [];

  // lấy dữ liệu rạp phim
  const cinemaData = useSelector((state) => state.listCinema?.listCinema || []);
  const cinema = useSelector(
    (state) => state.cinemaSystem?.cinemaSystem || []
  );

  const [page, setPage] = useState(1);
  const [group] = useState("GP01");
  const [pageSize] = useState(8);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [value, setValue] = useState(0);

  // Handle tabs change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCinema = cinemaData[newValue]?.maHeThongRap;
    if (selectedCinema) {
      dispatch(listCinemaSystemApi({ maHeThongRap: selectedCinema }));
    }
  };

  useEffect(() => {
    dispatch(listMoviePagination({ group, page, pageSize }));
    dispatch(listCinemaComplexApi());
    dispatch(listCinemaSystemApi({ maHeThongRap: "CGV" }));
  }, [dispatch, group, page, pageSize]);

  return (
    <>
      <Banner />
      <div className="movie-list"></div>
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
          MUA VÉ NGAY
        </Button>
      </div>

      {/* List Movies */}
      <div className="container">
        <div className="movies-container">
          {isLoading ? (
            <div className="loading">Đang tải dữ liệu...</div>
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
                          <Button variant="contained" className="buy-ticket-button">
                            <span className="buy-ticket-title"> MUA VÉ NGAY</span>
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
                variant="scrollable"
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
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>

              {/* Cinema Information for each system */}
              <div style={{ padding: "16px", maxHeight: "400px", overflowY: "auto", maxWidth:"300px"}}>
              {cinema.map((cinemas, index) => (
                   <div key={index}>
                     <Typography variant="h6">{cinemas.maCumRap}</Typography>
                     <Typography variant="body2">
                       {cinemas.tenCumRap}
                     </Typography>
                     <Typography variant="body2">{cinemas.diaChi}</Typography>
                   </div>
                 ))}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
