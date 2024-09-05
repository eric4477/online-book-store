import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import CustomIcon from "../assets/images/customIcon.svg";

const SocialHamburgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sm:hidden">
      <IconButton
        className="p-0"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            "@media (min-width: 640px)": {
              display: "none",
            },
            marginTop: "7px",
          },
        }}
        MenuListProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ED553B",
            alignItems: "center",
            gap: "15px",
            padding: "15px",
          },
        }}
      >
        <a href="#" onClick={handleClose}>
          <FaFacebookF className="text-[20px] text-white" />
        </a>
        <a href="#" onClick={handleClose}>
          <FaInstagram className="text-[20px] text-white" />
        </a>
        <a href="#" onClick={handleClose}>
          <FaLinkedinIn className="text-[20px] text-white" />
        </a>
        <a href="#" onClick={handleClose}>
          <FaTwitter className="text-[20px] text-white" />
        </a>
        <a href="#" onClick={handleClose}>
          <img src={CustomIcon} alt="custom icon" />
        </a>
      </Menu>
    </div>
  );
};

export default SocialHamburgerMenu;
