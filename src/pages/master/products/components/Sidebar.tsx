import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import plusIcon from "../../../../assets/images/plusIcon.svg";
import React from "react";

interface SidebarProps {
  isFixed: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ isFixed, setOpen }: SidebarProps) {
  return (
    <div
      className={`p-4 ${
        isFixed ? "min-w-[20%] max-w-[20%] p-0 pt-4 max-lg:hidden" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <Typography variant="h5" fontWeight="bold">
          Price
        </Typography>
        <span
          onClick={() => setOpen(false)}
          className="h-[2px] w-[17px] bg-[#393280] cursor-pointer"
        />
      </div>
      <Divider sx={{ backgroundColor: "#E0E0E0", marginY: 2 }} />
      <form className="mt-3 flex flex-col items-center">
        <div className="flex flex-row justify-between gap-5">
          <div className="flex items-center">
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
          <div className="flex items-center">
            <label className="font-extrabold" htmlFor="price-input-2">
              $
            </label>
            <input
              className="py-1 ml-2 rounded-sm border border-[#393280] w-full"
              id="price-input-2"
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
            marginBottom: "20px",
            "&:hover": {
              backgroundColor: "#393280",
            },
          }}
          className="text-white bg-[#393280] block"
        >
          Filter
        </Button>
      </form>
      <List className="py-6">
        {["Product type", "Availability", "Brand", "Color", "Material"].map(
          (text, index) => (
            <React.Fragment key={index}>
              <ListItem className="flex justify-between" sx={{ padding: 0 }}>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "#393280",
                  }}
                />
                <IconButton size="small" sx={{ padding: 0 }}>
                  <img src={plusIcon} alt="expand" />
                </IconButton>
              </ListItem>
              {index < 4 && (
                <Divider sx={{ backgroundColor: "#E0E0E0", marginY: 2 }} />
              )}
            </React.Fragment>
          )
        )}
      </List>
    </div>
  );
}

export default Sidebar;
