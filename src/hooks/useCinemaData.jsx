import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCinemaSystemApi, listShowTimeMovieApi } from "../store/slices/cinemaSlice";

const useCinemaData = () => {
  const dispatch = useDispatch();
  const cinemaData = useSelector((state) => state.cinema.listCinema || []);
  const cinema = useSelector((state) => state.cinema.cinemaSystem || []);
  const movieTime = useSelector((state) => state.cinema.movieTime || []);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);

  // Lấy hệ thống rạp mặc định khi load trang
  useEffect(() => {
    if (cinemaData.length > 0) {
      const defaultCinema = cinemaData[0].maHeThongRap;
      setSelectedCinema(defaultCinema);
    }
  }, [cinemaData]);

  // Fetch các rạp phim và lịch chiếu khi selectedCinema thay đổi
  useEffect(() => {
    if (selectedCinema) {
      dispatch(listCinemaSystemApi({ maHeThongRap: selectedCinema }));
      dispatch(listShowTimeMovieApi({ maHeThongRap: selectedCinema }));
    }
  }, [dispatch, selectedCinema]);

  return { cinemaData, cinema, movieTime, selectedCinema, setSelectedCinema, selectedCinemaId, setSelectedCinemaId };
};

export default useCinemaData;