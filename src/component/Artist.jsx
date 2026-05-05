import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import Discover from "./Discover";
import MusicPlayer from "./MusicPlayer/MusicPlayer";

const Artist = () => {
  const player = useSelector((state) => state.player);
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
          {player.songs.length != 0 ? <Discover /> : <></>}
          {Object.keys(player.activeSong).length === 0 ? (
            <></>
          ) : (
            <MusicPlayer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Artist;
