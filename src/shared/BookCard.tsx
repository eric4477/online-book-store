import { Book } from "../interfaces/MasterData";
import { useAppDispatch } from "../redux/hooks";
import { getRandomBookImg } from "../constants/FUNCTIONS";
import { getRandomBookAuthor } from "../constants/FUNCTIONS";
import { memo, useRef } from "react";
import { addToCart } from "../redux/cartSlice";

function BookCard({ book }: { book: Book }) {
  const dispatch = useAppDispatch();
  const bookImgSrc = getRandomBookImg();
  const bookAuthor = getRandomBookAuthor();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = () => {
    dispatch(addToCart({ book: book._id, quantity: 1 }));

    if (buttonRef.current) {
      buttonRef.current.textContent = "Added to Cart";
      buttonRef.current.style.backgroundColor = "green";
      buttonRef.current.disabled = true;

      // Reset the text after 1.5 seconds
      setTimeout(() => {
        buttonRef.current!.textContent = "Add to Cart";
        buttonRef.current!.style.backgroundColor = "";
        buttonRef.current!.disabled = false;
      }, 1500);
    }
  };

  return (
    <div className="book-card text-center max-w-[320px]">
      <div className="book-img-wrapper py-4 px-3 bg-white shadow-custom-light flex items-center justify-center relative">
        <img className=" w-full h-full" src={bookImgSrc} alt="book image" />
        <button
          ref={buttonRef}
          onClick={handleAddToCart}
          className="add-to-cart-btn tracking-widest shadow-lg text-base max-[400px]:text-sm"
        >
          add to cart
        </button>
      </div>

      <h3 className="book-name text-[#393280] font-semibold text-[22px] mt-4">
        {book.name}
      </h3>
      <h4 className="book-author text-[#888888] text-sm">{bookAuthor}</h4>
      <p className="text-[#ED553B] text-lg font-bold mt-2">$ {book.price}</p>
    </div>
  );
}

export default memo(BookCard);
