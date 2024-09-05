import { useEffect } from "react";
import Navbar from "../../../shared/Navbar";
import { setShowLinks, setShowLogo } from "../../../redux/navbarSlice";
import { useDispatch } from "react-redux";
import PageNavigator from "../../../shared/PageNavigator";

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
    </div>
  );
}

export default Products;
