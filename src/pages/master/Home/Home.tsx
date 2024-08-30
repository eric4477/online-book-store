import Categories from "./components/Categories";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div className="home-page font-inter">
      <Navbar />
      <Hero />
      <Categories />
    </div>
  );
}

export default Home;
