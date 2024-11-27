import { useDispatch, useSelector } from "react-redux";
import "./BookingSeat.css";
import { Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { bookingSeatApi, getBookingSeatApi } from "../../../store/slices/bookingSlice";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PATH } from "../../../routes/path";
import Loading from "../../../components/Loading/Loading";


export default function BookingSeat() {
  const { maLichChieu } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingSeat } = useSelector((state) => state.bookingSeat);
  const bookingInfo = bookingSeat?.thongTinPhim ? [bookingSeat.thongTinPhim] : [];
  const bookingMovieSeat = bookingSeat?.danhSachGhe || [];

  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (maLichChieu && maLichChieu !== ":maLichChieu") { 
      dispatch(getBookingSeatApi({ maLichChieu }))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, maLichChieu]);

  const handleSeatClick = (seat) => {
    if (seat.daDat) return; 
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat.maGhe)) {
        return prevSelectedSeats.filter((maGhe) => maGhe !== seat.maGhe);
      } else {
        return [...prevSelectedSeats, seat.maGhe];
      }
    });
  };

  useEffect(() => {
    const newTotalPrice = selectedSeats.reduce((total, maGhe) => {
      const seat = bookingMovieSeat.find((ghe) => ghe.maGhe === maGhe);
      return total + (seat?.giaVe || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedSeats, bookingMovieSeat]);

  const handleBooking = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt vé không?")) {
      const bookingData = {
        maLichChieu,
        danhSachVe: selectedSeats.map((maGhe) => {
          const seat = bookingMovieSeat.find((ghe) => ghe.maGhe === maGhe);
          return {
            maGhe: seat.maGhe,
            giaVe: seat.giaVe
          }
        })
      };
      dispatch(bookingSeatApi(bookingData))
        .unwrap()
        .then(() => {
          toast.success("Đặt vé thành công!");
          navigate(PATH.HOME); 
        })
        .catch(() => {
          toast.error(`Vui lòng đăng nhập để đặt vé! `);
          navigate(PATH.LOGIN);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="booking-seat">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{paddingLeft: '136px', paddingRight: '100px', marginTop:"20px"}}>
          <div className="booking-seat-header"></div>
          <div className="seat-grid">
            {bookingMovieSeat.map((seat) => (
              <div
                key={seat.maGhe}
                className={`seat ${seat.loaiGhe.toLowerCase()} ${
                  seat.daDat ? "booked" : ""
                } ${selectedSeats.includes(seat.maGhe) ? "selected" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.tenGhe}
              </div>
            ))}
          </div>
          <div className="legend">
            <div className="legend-item">
              <div className="seat booked"></div> Đã đặt
            </div>
            <div className="legend-item">
              <div className="seat normal"></div> Thường
            </div>
            <div className="legend-item">
              <div className="seat vip"></div> Vip
            </div>
            <div className="legend-item">
              <div className="seat selected"></div> Đã chọn
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{paddingLeft: '300px'}}>
          <div className="booking-info-container">
            {bookingInfo.map((infoMovie, index) => (
              <div key={index}>
                <div className="booking-info-title">
                  {totalPrice.toLocaleString()} VND
                </div>
                <div className="info-item">Cụm Rạp: <span className="info-item-value">{infoMovie.tenCumRap}</span></div>
                <div className="info-item">Địa chỉ: <span className="info-item-value">{infoMovie.diaChi}</span></div>
                <div className="info-item">Rạp: <span className="info-item-value">{infoMovie.tenRap}</span></div>
                <div className="info-item">
                  Ngày giờ chiếu: <span className="info-item-value">{infoMovie.ngayChieu} - {infoMovie.gioChieu}</span>
                </div>
                <div className="info-item">Tên Phim: <span className="info-item-value">{infoMovie.tenPhim}</span></div>
                <div className="info-item">
                  Chọn:
                  <span className="info-item-value">
                    {" số ghế: "}
                    {selectedSeats
                      .map((maGhe) => {
                        const seat = bookingMovieSeat.find(
                          (ghe) => ghe.maGhe === maGhe
                        );
                        return seat ? seat.tenGhe : null;
                      })
                      .join(", sô ghế: ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="contained" className="book-button" onClick={handleBooking}>
            ĐẶT VÉ
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
