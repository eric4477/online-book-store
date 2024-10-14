import { useState } from "react";
import { IconButton, Drawer, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import profileIcon from "../assets/images/profile-icon.svg";
import heartIcon from "../assets/images/heart-icon.svg";
import shoppingIcon from "../assets/images/shopping-icon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

export default function HamburgerMenu() {
  const { showLinks } = useSelector((state: RootState) => state.navbar);
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (
      event:
        | React.KeyboardEvent<Element>
        | React.MouseEvent<Element, MouseEvent>
    ) => {
      if (
        (event.type === "keydown" &&
          (event as React.KeyboardEvent<Element>).key === "Tab") ||
        (event as React.KeyboardEvent<Element>).key === "Shift"
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <div className="min-[1101px]:hidden">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        className="hamburger-icon"
        onClick={toggleDrawer(true)}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "2rem",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{
            width: 250,
            paddingTop: "30px",
          }}
        >
          {showLinks && (
            <List className="flex flex-col items-center gap-5">
              <a
                href="#"
                className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B] max-sm:text-base"
              >
                home
              </a>
              <a
                href="#about-us"
                className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B] max-sm:text-base"
              >
                ABOUT US
              </a>

              <a
                href="#books"
                className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B] max-sm:text-base"
              >
                BOOKS
              </a>

              <a
                href="#new-release"
                className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B] max-sm:text-base"
              >
                NEW RELEASE
              </a>

              <a
                href="#contact-us"
                className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B] max-sm:text-base"
              >
                CONTACT US
              </a>

              <a
                href="#blog"
                className="uppercase text-lg font-medium text-[#111111] hover:text-[#ED553B] max-sm:text-base"
              >
                BLOG
              </a>
            </List>
          )}
          <div
            className={`flex items-center justify-center gap-5 mt-16 ${
              showLinks ? "flex-row" : "flex-col"
            }`}
          >
            <button>
              <img src={profileIcon} alt="profile button" />
            </button>
            {showLinks ? (
              <span className="w-[2px] h-5 bg-[#D1D1D1]" />
            ) : (
              <span className="w-[40px] h-[2px] bg-[#393280]" />
            )}
            <div className="relative flex items-center justify-center">
              {totalQuantity > 0 && (
                <span
                  className={`absolute text-xs top-[-16px] ${
                    totalQuantity >= 10
                      ? "right-[-15px]"
                      : "right-[-14px] px-[6px]"
                  }  bg-[#ED553B] text-white  font-semibold rounded-[100%] px-[4px] py-[2px]`}
                >
                  {totalQuantity}
                </span>
              )}

              <Link to={"/home/cart"}>
                <img src={shoppingIcon} alt="profile button" />
              </Link>
            </div>

            {showLinks ? (
              <span className="w-[2px] h-5 bg-[#D1D1D1]" />
            ) : (
              <span className="w-[40px] h-[2px] bg-[#393280]" />
            )}
            <button>
              <img src={heartIcon} alt="profile button" />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
