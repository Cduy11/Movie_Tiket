import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { bannerApi } from "../../store/slices/bannerSlice";

export default function Banner() {
  const dispatch = useDispatch()
  const {banner, isLoading, error} = useSelector((state) => state.banner)
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 2000)}s`;
  };

  useEffect(() => {
    dispatch(bannerApi())
  }, [dispatch])

  return (
    <div className="banner-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading banners</p>}
      {!isLoading && !error && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            className: "banner-pagination",
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft} 
          className="banner-swiper"
        >
          {/* render banner */}
          {banner.map((item, index) => (
            <SwiperSlide key={index} className="banner-slide">
              <img src={item.hinhAnh} alt={`banner${index + 1}`} />
            </SwiperSlide>
          ))}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      )}
    </div>
  );
}
