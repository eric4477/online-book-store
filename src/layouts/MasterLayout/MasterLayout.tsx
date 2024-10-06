import { Outlet } from "react-router-dom";
import SocialNavbar from "../../shared/SocialNavbar";

function MasterLayout() {
  return (
    <div>
      <header>
        <SocialNavbar />
      </header>
      <Outlet />
    </div>
  );
}

export default MasterLayout;
