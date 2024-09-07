import { ReactNode } from "react";
import rightArrow from "../../../../assets/images/right-arrow.svg";
import { useNavigate } from "react-router-dom";

export default function CustomButton({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <button
      className="border border-[#393280] flex items-center justify-center gap-1
      rounded-md px-6 py-[2vw] min-500:py-3 uppercase text-sm md:text-base max-[500px]:text-[3vw] font-normal tracking-wider text-[#393280]"
      onClick={() => navigate("/home/products")}
    >
      {children}
      <img src={rightArrow} alt="right arrow" />
    </button>
  );
}
