import profileIcon from "../assets/images/profile-icon.svg";
import shoppingIcon from "../assets/images/shopping-icon.svg";
import heartIcon from "../assets/images/heart-icon.svg";
import HamburgerMenu from "../shared/HamburgerMenu";
import customLogo from "../assets/images/customLogo.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

function Navbar() {
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const { showLinks, showLogo } = useSelector(
    (state: RootState) => state.navbar
  );

  return (
    <nav className="navbar flex items-center justify-between py-5 px-10 max-sm:px-5">
      {!showLogo ? (
        <div
          className="flex items-center w-[86px] h-[86px] rounded-full bg-[#C4C4C4]
      max-[1100px]:w-[70px]  max-[1100px]:h-[70px] max-sm:w-[60px] max-sm:h-[60px]"
        />
      ) : (
        <div
          className="flex items-center justify-center cursor-pointer max-sm:w-[45px] max-sm:h-[45px]"
          onClick={() => navigate("/home")}
        >
          <img className="w-full h-full" src={customLogo} alt="custom logo" />
        </div>
      )}

      {showLinks ? (
        <div className="links flex items-center gap-3 max-[1100px]:hidden">
          <a
            href="#"
            className="uppercase text-lg font-medium text-[#111111]  hover:text-[#ED553B]"
          >
            home
          </a>
          <span className="w-[2px] h-5 bg-[#D1D1D1]" />
          <a
            href="#about-us"
            className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B]"
          >
            ABOUT US
          </a>
          <span className="w-[2px] h-5 bg-[#D1D1D1]" />
          <a
            href="#books"
            className="uppercase text-lg font-medium text-[#111111]  hover:text-[#ED553B]"
          >
            BOOKS
          </a>
          <span className="w-[2px] h-5 bg-[#D1D1D1]" />
          <a
            href="#new-release"
            className="uppercase text-lg font-medium text-[#111111]  hover:text-[#ED553B]"
          >
            NEW RELEASE
          </a>
          <span className="w-[2px] h-5 bg-[#D1D1D1]" />
          <a
            href="#contact-us"
            className="uppercase text-lg font-medium text-[#111111]  hover:text-[#ED553B]"
          >
            CONTACT US
          </a>
          <span className="w-[2px] h-5 bg-[#D1D1D1]" />
          <a
            href="#blog"
            className="uppercase text-lg font-medium text-[#111111]  hover:text-[#ED553B]"
          >
            BLOG
          </a>
        </div>
      ) : (
        <div
          className="flex items-center w-[86px] h-[86px] rounded-full bg-[#C4C4C4]
        max-[1100px]:w-[70px]  max-[1100px]:h-[70px] max-sm:w-[60px] max-sm:h-[60px]"
        />
      )}

      <div className="flex items-center gap-5 max-[1100px]:hidden">
        <button>
          <img src={profileIcon} alt="profile button" />
        </button>
        <span className="w-[2px] h-5 bg-[#D1D1D1]" />
        <div className="relative flex items-center justify-center">
          {totalQuantity > 0 && (
            <span
              className={`absolute text-xs top-[-16px] ${
                totalQuantity >= 10 ? "right-[-15px]" : "right-[-14px] px-[6px]"
              }  bg-[#ED553B] text-white  font-semibold rounded-[100%] px-[4px] py-[2px]`}
            >
              {totalQuantity}
            </span>
          )}

          <button onClick={() => navigate("/home/cart")}>
            <img src={shoppingIcon} alt="profile button" />
          </button>
        </div>
        <span className="w-[2px] h-5 bg-[#D1D1D1]" />
        <button>
          <img src={heartIcon} alt="profile button" />
        </button>
      </div>

      <HamburgerMenu />
    </nav>
  );
}

export default Navbar;
