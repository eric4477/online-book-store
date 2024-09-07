import { useEffect } from "react";
import Navbar from "../../../shared/Navbar";
import { setShowLinks, setShowLogo } from "../../../redux/navbarSlice";
import { useDispatch } from "react-redux";
import PageNavigator from "../../../shared/PageNavigator";
import Sidebar from "./components/Sidebar";
import BooksPagination from "./components/BooksPagination";

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
      <div className="flex flex-row px-5 pt-16 pb-10 gap-14">
        <Sidebar />
        <BooksPagination />
      </div>
    </div>
  );
}

export default Products;
