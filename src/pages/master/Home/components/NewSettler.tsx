import { IoMailSharp } from "react-icons/io5";
function Newsletter() {
  return (
    <section
      id="contact-us"
      className="bg-[#FCECEC] px-20 pb-24 max-sm:px-10 max-[400px]:px-4"
    >
      <div className="bg-[#ED553B] text-white pt-9 pb-20 text-center relative px-1">
        <h2 className="text-[45px] font-bold tracking-wider max-[500px]:text-3xl">
          Subscibe to Our Newsletter
        </h2>
        <p className="font-medium text-[20px] w-[60%] mx-auto mt-3 max-[500px]:text-base max-[500px]:w-[90%]">
          Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
          consectetur. Elit adipiscing enim pharetra hac.
        </p>
        <div
          className="absolute bottom-[-40px] flex flex-row items-center bg-white 
          focus-within:ring focus-within:ring-indigo-800 shadow-lg py-4 px-4 left-1/2  transform 
          -translate-x-1/2 w-[85%] lg:w-[50%]"
        >
          <div className="flex items-center justify-center border border-[#DFDFDF] p-2 mr-4 max-[500px]:hidden">
            <IoMailSharp size={26} color="#6C777C" />
          </div>

          <input
            className=" focus:border-none text-black outline-none w-full h-full pr-4"
            type="text"
            placeholder="youremail123@gmail.com"
          />
          <button
            className="uppercase bg-[#ED553B] font-medium py-4 px-7 tracking-wider self-end 
          transition hover:bg-[#C74429] max-[500px]:py-3 max-[500px]:px-3 max-[500px]:text-sm"
          >
            subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
