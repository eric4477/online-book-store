import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import CustomButton from "./CustomButton";
import featureBookImg from "../../../../assets/images/feature-book.jpg";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { featuredBooks } from "../../../../constants/FEATUREDBOOKS";

function FeaturedBooks() {
  const swiperRef = useRef<SwiperCore | null>(null);
  return (
    <section className="featured-books-section py-12 my-12 bg-gradient-to-r from-[#FBEEEE] to-[#F7FFFE] relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 4000 }}
      >
        {featuredBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="flex flex-row items-center max-lg:flex-col gap-8 px-5"
            >
              <div className="feature-book-img-wrapper flex items-center justify-center w-1/2 max-lg:w-full pb-12">
                <img src={featureBookImg} alt="book image" />
              </div>
              <div className="flex flex-col w-1/2  max-lg:w-full max-lg:items-center">
                <h2 className="text-5xl font-semibold text-[#393280] max-[500px]:text-4xl">
                  Featured book
                </h2>
                <span className="w-28 h-[2px] bg-[#ED553B] mt-14"></span>
                <h4 className="author text-[13px] font-medium  text-[#888888] uppercase tracking-widest mt-2">
                  By {book.Author}
                </h4>
                <h3 className="book-title text-[28px] text-[#393280] font-semibold mt-5 max-[500px]:text-[22px]">
                  {book.title}
                </h3>
                <p className="text-[#7A7A7A] max-w-[70%] mt-4 leading-8 max-lg:max-w-[50%] max-sm:max-w-[80%]">
                  {book.Description}
                </p>
                <p className="book-price text-[#ED553B] text-[23px] font-bold mt-7">
                  $ {book.price}
                </p>
                <div className="flex items-center justify-start mt-20">
                  <CustomButton>View more</CustomButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="flex justify-center text-center">
          <div className="custom-swiper-pagination mt-7 "></div>
        </div>
      </Swiper>
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

export default FeaturedBooks;
