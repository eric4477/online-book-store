import { articles } from "../../../../constants/ARTICLES";
import { GoArrowRight } from "react-icons/go";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
function Articles() {
  return (
    <section id="blog" className="bg-[#F7FCFC] py-10 px-10">
      <div className="header flex flex-col items-center gap-4">
        <h5 className="font-medium text-sm text-[#7A7A7A] uppercase tracking-wide">
          Read our articles
        </h5>

        <h2 className="text-[#173F5F] text-5xl mb-10 max-[500px]:text-4xl">
          Latest Articles
        </h2>
      </div>
      <div className="articles flex flex-row justify-between items-center flex-wrap gap-y-10 gap-x-7 max-lg:justify-center">
        {articles.map((article, index) => (
          <div key={index} className="article max-w-[419px]">
            <div className="article-img">
              <img src={article.img} alt="article image" />
            </div>
            <p className="text-[#74642F] text-[15px] mt-4">{article.date}</p>
            <h4 className="text-[#173F5F] text-2xl  mt-2">
              Reading books always makes the moments happy
            </h4>
            <div className="border border-[#C8C8C8] mt-4 my-4"></div>
            <div className="flex items-center justify-end gap-4">
              <FaFacebookF color="#173F5F" />
              <FaTwitter color="#173F5F" />
              <FaInstagram color="#173F5F" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-11">
        <button
          className="uppercase text-[#173F5F] py-3 px-4 border border-[#C0C0C0] flex 
        items-center justify-center gap-1"
        >
          read all articles
          <GoArrowRight color="black" />
        </button>
      </div>
    </section>
  );
}

export default Articles;
