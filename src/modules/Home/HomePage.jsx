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
} from "@mui/material";
import Banner from "../../components/Banner/Banner";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { listMoviePagination } from "../../store/slices/homeSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    movies: movieList,
    isLoading,
    error,
  } = useSelector((state) => state.home);
  const movies = movieList?.items || [];

  const [page, setPage] = useState(1);
  const [group] = useState("GP01");
  const [pageSize] = useState(8);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    dispatch(listMoviePagination({ group, page, pageSize }));
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
      <div className="container">
        {/* Movies */}
        <div className="movies-container">
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
                        >
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
    </>
  );
}
