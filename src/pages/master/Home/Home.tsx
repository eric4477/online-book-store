import { useEffect } from "react";
import Categories from "./components/Categories";
import FeaturedBooks from "./components/FeaturedBooks";
import Hero from "./components/Hero";
import Navbar from "../../../shared/Navbar";
import NewRelease from "./components/NewRelease";
import { setShowLinks, setShowLogo } from "../../../redux/navbarSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowLinks(true));
    dispatch(setShowLogo(false));
  }, [dispatch]);

  return (
    <div className="home-page font-inter">
      <Navbar />
      <Hero />
      <Categories />
      <NewRelease />
      <FeaturedBooks />
    </div>
  );
}

export default Home;
