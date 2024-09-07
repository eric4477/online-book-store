import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../../../../shared/BookCard";
import redRightArrow from "../../../../assets/images/red-right-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { masterUrls } from "../../../../constants/URL_END_POINTS";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../../interfaces/MasterData";

function NewRelease() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(masterUrls.getBooks(1, 8));
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="new-release-section py-10 bg-[#FCECEC]">
      <h3 className="sub-header text-center text-[13px] font-medium tracking-widest text-[#7A7A7A] uppercase">
        Some quality items
      </h3>
      <h2 className="header text-5xl text-[#393280] font-semibold text-center mt-3 mb-10 max-[600px]:text-4xl">
        New Release Books
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        className="custom-swiper pt-4 pb-10"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          550: {
            slidesPerView: 2,
          },
          915: {
            slidesPerView: 3,
          },
          1245: {
            slidesPerView: 4,
          },
        }}
        slidesPerView={4}
        spaceBetween={30}
        loop={false}
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
        autoplay={{ delay: 2500 }}
      >
        {books.map((book) => (
          <SwiperSlide key={book._id} className="px-4">
            <BookCard book={book} />
          </SwiperSlide>
        ))}
        <hr className="mt-7 border border-[#E0E0E0] mx-2 mb-6" />
        <div className="flex items-center justify-between px-4 max-[600px]:flex-col max-[600px]:gap-3">
          <div className="flex-1 flex justify-center items-center text-center pl-40 max-[600px]:p-0">
            <div className="custom-swiper-pagination"></div>
          </div>
          <button
            className="text-base font-bold text-[#ED553B] flex justify-center items-center gap-1"
            onClick={() => navigate("/home/products")}
          >
            View all products
            <img src={redRightArrow} alt="right arrow" />
          </button>
        </div>
      </Swiper>
    </section>
  );
}

export default NewRelease;
