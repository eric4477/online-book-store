import { Outlet } from "react-router-dom";
import SocialNavbar from "../../shared/SocialNavbar";
function MasterLayout() {
  return (
    <>
      <header>
        <SocialNavbar />
      </header>
      <Outlet />
    </>
  );
}

export default MasterLayout;
