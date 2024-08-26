import { useState } from "react";
import { IconButton, Drawer, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import profileIcon from "../../../../assets/images/profile-icon.svg";
import heartIcon from "../../../../assets/images/heart-icon.svg";
import shoppingIcon from "../../../../assets/images/shopping-icon.svg";

export default function HamburgerMenu() {
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
    <div className="min-[1100px]:hidden">
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
          <div className="flex items-center justify-center gap-5 mt-16">
            <button>
              <img src={profileIcon} alt="profile button" />
            </button>
            <span className="w-[2px] h-5 bg-[#D1D1D1]" />
            <button>
              <img src={shoppingIcon} alt="profile button" />
            </button>
            <span className="w-[2px] h-5 bg-[#D1D1D1]" />
            <button>
              <img src={heartIcon} alt="profile button" />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
