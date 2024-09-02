import { categories } from "../../../../constants/CATEGORIES";
import CustomButton from "./CustomButton";

export default function Categories() {
  return (
    <section className="categories-section py-10 px-10 sm:px-24">
      <div className="subheader flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#ED553B]"></span>
        <h3 className="text-[#ED553B] font-bold text-sm tracking-widest">
          Categories
        </h3>
      </div>
      <h1 className="header text-[#393280] font-bold text-2xl min-500:text-[32px] mt-1">
        Explore our Top Categories
      </h1>
      <div className="categories flex flex-row justify-center lg:justify-between flex-wrap gap-y-8 gap-x-4 mt-8">
        {categories.map((category, index) => (
          <div key={index} className="category text-center">
            <div className="w-full">
              <img
                className="object-cover"
                src={category.img}
                alt={`category image ${index}`}
              />
            </div>
            <h4 className="text-[5vw] min-500:text-2xl font-semibold text-[#393280] mt-2 min-500:mt-5">
              {category.title}
            </h4>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <CustomButton>View more</CustomButton>
      </div>
    </section>
  );
}
