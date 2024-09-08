import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { SidebarProps } from "../../../../interfaces/MasterData";

function FilterSideMenu({ open, setOpen }: SidebarProps) {
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className=" lg:hidden">
      <IconButton onClick={toggleDrawer} sx={{ color: "black" }}>
        <MenuIcon sx={{ fontSize: "40px" }} />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Sidebar setOpen={setOpen} isFixed={false} />
      </Drawer>
    </div>
  );
}

export default FilterSideMenu;
