import { Box, Button, Typography } from "@mui/material";
import "./BookingSeat.css";
export default function BookingSeat() {
  const seats = Array.from({ length: 126 }, (_, index) => index + 1);

  return (
    <div className="flex flex-col lg:flex-row p-6">
      {/* Danh sách ghế */}
      <div className="grid grid-cols-8 gap-2 mx-auto mb-4 lg:w-7/12">
        {seats.map((seat) => (
          <Box
            key={seat}
            className={`w-10 h-10 flex items-center justify-center cursor-pointer 
                  ${
                    seat >= 35 && seat <= 126 ? "bg-orange-500" : "bg-gray-200"
                  }`}
            sx={{ borderRadius: "4px" }}
          >
            <Typography>{seat < 10 ? `0${seat}` : seat}</Typography>
          </Box>
        ))}
      </div>

      {/* Thông tin đặt vé */}
      <div className="flex-1 lg:ml-8 bg-white p-4 shadow-lg rounded-md lg:w-5/12">
        <Typography variant="h6" className="text-green-500 mb-4 text-center">
          0 VNĐ
        </Typography>
        <div className="space-y-4">
          <p>
            <strong>Cụm Rạp:</strong> BHD Star Cineplex - 3/2
          </p>
          <p>
            <strong>Địa chỉ:</strong> L5-Vincom 3/2, 3C Đường 3/2, Q.10
          </p>
          <p>
            <strong>Rạp:</strong> Rạp 1
          </p>
          <p>
            <strong>Ngày giờ chiếu:</strong> 15/10/2010 - 10:10
          </p>
          <p>
            <strong>Tên Phim:</strong> Terrifier 3
          </p>
        </div>

        {/* Nút đặt vé */}
        <Button variant="contained" color="error" className="w-full mt-6">
          ĐẶT VÉ
        </Button>
      </div>
    </div>
  );
}
