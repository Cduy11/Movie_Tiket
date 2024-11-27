import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { listTicketHistory } from "../../../../store/slices/homeSlice";
import { useEffect } from "react";
export default function Profile() {
  const dispatch = useDispatch();
  const { ticketHistory } = useSelector((state) => state.home);

  const infoTicket = ticketHistory?.thongTinDatVe || [];
  console.log("infoTicket", infoTicket);

  useEffect(() => {
    dispatch(listTicketHistory());
  }, [dispatch]);

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile">
          <div className="profile-title">Lịch Sử Đặt Vé</div>

          <div className="ticket">
            {infoTicket.length > 0 ? (
              infoTicket.map((item) =>
                item.danhSachGhe.map((ghe) => (
                  <div
                    key={`${item.maVe}-${ghe.maGhe}`}
                    className="ticket-card"
                  >
                    <div className="ticket-date">
                      Ngày đặt:{" "}
                      <span className="ticket-date-text">
                        {new Date(item.ngayDat).toLocaleString()}
                      </span>
                    </div>
                    <div className="ticket-title">
                      Tên phim:{" "}
                      <span className="movie-title">{item.tenPhim}</span>
                    </div>
                    <div className="ticket-details">
                      Thời lượng: {item.thoiLuongPhim} phút, Giá vé:{" "}
                      {item.giaVe.toLocaleString()} VND
                    </div>
                    <div className="ticket-cinema">{ghe.tenHeThongRap}</div>
                    <div className="ticket-seat">
                      Rạp: {ghe.maCumRap},  Ghế số: {ghe.tenGhe}
                    </div>
                  </div>
                ))
              )
            ) : (
              <div>Không có lịch sử đặt vé.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
