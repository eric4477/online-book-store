import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import bookImg from "../../../../assets/images/hero-book2.png";
import CustomButton from "./CustomButton";

function Hero() {
  const swiperRef = useRef<SwiperCore | null>(null);
  return (
    <section className="hero-section linear-gradient-hero-bg relative">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <div className="slider-content px-24 max-lg:px-16 max-sm:px-10 flex flex-row max-lg:flex-col gap-4">
            <div className="py-[100px] grow max-lg:pb-[20px]">
              <h1 className="text-4xl min-500:text-5xl lg:text-6xl text-[#393280] font-semibold mb-4">
                Ipsum Dolor Si
              </h1>
              <p className="text-base min-500:text-lg lg:text-[22px] leading-7 md:leading-8 lg:leading-9 font-medium text-[#393280] mb-6 xl:max-w-[70%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                lacus ut magna velit eleifend. Amet, quis urna, a eu.
              </p>
              <CustomButton>Read more</CustomButton>
            </div>
            <div className="flex items-center justify-center max-lg:pb-[20px]">
              <img
                className="min-500:max-w-[550px] min-500:max-h-[550px]"
                src={bookImg}
                alt="book"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-content flex flex-row max-lg:flex-col gap-4 px-24 max-lg:px-16 max-sm:px-10">
            <div className="py-[100px] grow max-lg:pb-[20px]">
              <h1 className="text-4xl min-500:text-5xl lg:text-6xl text-[#393280] font-semibold mb-4">
                Sed Libero Euismod
              </h1>
              <p className="text-base min-500:text-lg lg:text-[22px] leading-7 md:leading-8 lg:leading-9 font-medium text-[#393280] mb-6 xl:max-w-[70%]">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Nulla facilisi. Aliquam erat volutpat.
                Proin id libero vel felis hendrerit convallis nec in urna.
              </p>
              <CustomButton>Read more</CustomButton>
            </div>
            <div className="flex items-center justify-center max-lg:pb-[20px]">
              <img
                className="min-500:max-w-[550px] min-500:max-h-[550px]"
                src={bookImg}
                alt="book"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-content flex flex-row max-lg:flex-col gap-4 px-24 max-lg:px-16 max-sm:px-10">
            <div className="py-[100px] grow max-lg:pb-[20px]">
              <h1 className="text-4xl min-500:text-5xl lg:text-6xl text-[#393280] font-semibold mb-4">
                Lorem Vitae Enim
              </h1>
              <p className="text-base min-500:text-lg lg:text-[22px] leading-7 md:leading-8 lg:leading-9 font-medium text-[#393280] mb-6 xl:max-w-[70%]">
                Curabitur vehicula augue ac libero ultricies, sed luctus magna
                aliquet. Phasellus eget magna non leo faucibus malesuada.
                Integer vitae nulla auctor, laoreet ex non, varius odio.
              </p>
              <CustomButton>Read more</CustomButton>
            </div>
            <div className="flex items-center justify-center max-lg:pb-[20px]">
              <img
                className="min-500:max-w-[550px] min-500:max-h-[550px]"
                src={bookImg}
                alt="book"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-content flex flex-row max-lg:flex-col gap-4 px-24 max-lg:px-16 max-sm:px-10">
            <div className="py-[100px] grow max-lg:pb-[20px]">
              <h1 className="text-4xl min-500:text-5xl lg:text-6xl text-[#393280] font-semibold mb-4">
                Amet Elit Commodo
              </h1>
              <p className="text-base min-500:text-lg lg:text-[22px] leading-7 md:leading-8 lg:leading-9 font-medium text-[#393280] mb-6 xl:max-w-[70%]">
                Suspendisse potenti. Nam vitae mauris auctor, gravida enim a,
                fermentum neque. Nulla facilisi. Etiam vehicula turpis nec magna
                fringilla, at tristique magna malesuada.
              </p>
              <CustomButton>Read more</CustomButton>
            </div>
            <div className="flex items-center justify-center max-lg:pb-[20px]">
              <img
                className="min-500:max-w-[550px] min-500:max-h-[550px]"
                src={bookImg}
                alt="book"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Custom Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full 
        py-2 px-2 border border-[#ED553B] bg-white max-[550px]:hidden z-20"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <GoArrowLeft fill="#ED553B" size={20} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full 
        py-2 px-2 border border-[#ED553B] bg-white max-[550px]:hidden z-20"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <GoArrowRight fill="#ED553B" size={20} />
      </button>
    </section>
  );
}

export default Hero;
