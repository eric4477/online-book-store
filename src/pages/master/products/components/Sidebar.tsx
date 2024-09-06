import { Button } from "@mui/material";
import plusIcon from "../../../../assets/images/plusIcon.svg";
function Sidebar() {
  return (
    <div className="sidebar flex flex-col w-[280px]">
      <div className="flex items-center justify-between">
        <h5 className="text-bsae font-bold">Price</h5>
        <span className="h-[2px] w-[17px] bg-[#393280]" />
      </div>
      <hr className="h-[2px] bg-[#E0E0E0] mt-4" />
      <form className="mt-3 flex flex-col items-center">
        <div className="flex flex-row justify-between gap-5">
          <div className="flex items-center ">
            <label className="font-extrabold" htmlFor="price-input-1">
              $
            </label>
            <input
              className="py-1 ml-2 rounded-sm border border-[#393280] w-full"
              id="price-input-1"
              type="number"
            />
          </div>
          <span className="text-lg text-[#888888] font-medium flex items-center">
            to
          </span>
          <div className="flex items-center ">
            <label className="font-extrabold" htmlFor="price-input-1">
              $
            </label>
            <input
              className="py-1 ml-2 rounded-sm border border-[#393280] w-full"
              id="price-input-1"
              type="number"
            />
          </div>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#393280",
            color: "white",
            width: "100%",
            borderRadius: "2px",
            marginTop: "20px",
            padding: "10px 0",
            boxShadow: "none",
            textTransform: "none",
            fontWeight: "400",
            "&:hover": {
              backgroundColor: "#393280",
            },
          }}
          className="text-white bg-[#393280] block"
        >
          Filter
        </Button>
      </form>
      <ul className="flex flex-col py-6">
        <li className="flex flex-row justify-between text-base font-bold text-[#393280]">
          <h4>Product type</h4>
          <button className="grid place-items-center">
            <img src={plusIcon} alt="button" />
          </button>
        </li>
        <hr className="h-[2px] bg-[#E0E0E0] mt-4 mb-4" />
        <li className="flex flex-row justify-between text-base font-bold text-[#393280]">
          <h4>Availability</h4>
          <button className="grid place-items-center">
            <img src={plusIcon} alt="button" />
          </button>
        </li>
        <hr className="h-[2px] bg-[#E0E0E0] mt-4 mb-4" />
        <li className="flex flex-row justify-between text-base font-bold text-[#393280]">
          <h4>Brand</h4>
          <button>
            <img src={plusIcon} alt="button" />
          </button>
        </li>
        <hr className="h-[2px] bg-[#E0E0E0] mt-4 mb-4" />
        <li className="flex flex-row justify-between text-base font-bold text-[#393280]">
          <h4>Color</h4>
          <button className="grid place-items-center">
            <img src={plusIcon} alt="button" />
          </button>
        </li>
        <hr className="h-[2px] bg-[#E0E0E0] mt-4 mb-4" />
        <li className="flex flex-row justify-between text-base font-bold text-[#393280]">
          <h4>Material</h4>
          <button className="grid place-items-center">
            <img src={plusIcon} alt="button" />
          </button>
        </li>
        <hr className="h-[2px] bg-[#E0E0E0] mt-4" />
      </ul>
    </div>
  );
}

export default Sidebar;
