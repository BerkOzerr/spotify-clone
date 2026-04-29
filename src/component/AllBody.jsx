import Discover from "./Discover";
import SideBar from "./SideBar";
import TopPlay from "./TopPlay";
import SearchBar from "./SearchBar";

const AllBody = () => {
  return (
    <div className="container-bg  min-h-svh  flex flex-row justify-evenly ">
      <div className="">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex  bg-[#1a1a1a71] h-24 items-center   w-full">
          <SearchBar />
        </div>
        <div className="flex w-full h-full">
          <Discover />
        </div>
      </div>
    </div>
  );
};

export default AllBody;
