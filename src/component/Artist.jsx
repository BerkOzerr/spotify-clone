import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import ArtistDiscover from "./ArtistDiscover";

const Artist = () => {
  const player = useSelector((state) => state.player);
  // console.log(player.artists[0].data.length);
  return (
    <div className="container-bg  min-h-svh  flex flex-row justify-evenly ">
      <div className="">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex  bg-[#1a1a1a71] h-24 items-center   w-full">
          <SearchBar />
        </div>
        <div className="relative flex w-full h-full">
          {player.artists[0].data.length > 0 ? (
            <ArtistDiscover />
          ) : (
            <span>Search Artist Name... </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Artist;
