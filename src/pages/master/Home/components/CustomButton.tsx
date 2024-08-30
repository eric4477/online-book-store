import { ReactNode } from "react";
import rightArrow from "../../../../assets/images/right-arrow.svg";

export default function CustomButton({ children }: { children: ReactNode }) {
  return (
    <button
      className="border border-[#393280] flex items-center justify-center gap-1
      rounded-md px-6 py-3 uppercase text-sm md:text-base font-normal tracking-wider text-[#393280]"
    >
      {children}
      <img src={rightArrow} alt="right arrow" />
    </button>
  );
}
