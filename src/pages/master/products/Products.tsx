import { useEffect } from "react";
import Navbar from "../../../shared/Navbar";
import { setShowLinks, setShowLogo } from "../../../redux/navbarSlice";
import { useDispatch } from "react-redux";
import PageNavigator from "../../../shared/PageNavigator";
import SideBar from "./components/SideBar";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowLinks(false));
    dispatch(setShowLogo(true));
  }, [dispatch]);

  return (
    <div className="products-page font-inter">
      <Navbar />
      <PageNavigator page={"Products"} />
      <div className="flex flex-row px-5 py-8">
        <SideBar />
      </div>
    </div>
  );
}

export default Products;
