import { useEffect } from "react";
import Navbar from "../../../shared/Navbar";
import { setShowLinks, setShowLogo } from "../../../redux/navbarSlice";
import { useDispatch } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowLinks(false));
    dispatch(setShowLogo(true));
  }, [dispatch]);

  return (
    <div className="products-page font-inter">
      <Navbar />
    </div>
  );
}

export default Products;
