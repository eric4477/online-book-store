import Categories from "./components/Categories";
import FeaturedBooks from "./components/FeaturedBooks";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import NewRelease from "./components/NewRelease";

function Home() {
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
