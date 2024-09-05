import { Link } from "react-router-dom";
function PageNavigator({ page }: { page: string }) {
  return (
    <nav
      className="bg-gradient-to-r from-[#FFE6E6] to-[#F5FFFE] 
  flex items-center justify-center py-6"
    >
      <div className="flex items-center text-xl text-[#393280] font-medium uppercase max-sm:text-base">
        <Link to={"/home"} className=" mr-2">
          Home
        </Link>
        /<span className="ml-2">{page}</span>
      </div>
    </nav>
  );
}

export default PageNavigator;
