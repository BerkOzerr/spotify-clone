import Discover from "./Discover";
import SideBar from "./SideBar";

import SearchBar from "./SearchBar";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "./Loader";

const AllBody = () => {
  const player = useSelector((state) => state.player);
  // useEffect(() => {
  //   console.log(player);
  // }, []);
  return (
    <div className="container-bg relative  min-h-svh  flex flex-row justify-evenly ">
      <div className="">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex  bg-[#1a1a1a71] h-24 items-center   w-full">
          <SearchBar />
        </div>
        {player.isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="relative flex w-full h-full">
              {player.songs.length != 0 ? <Discover /> : <></>}
              {Object.keys(player.activeSong).length === 0 ? (
                <></>
              ) : (
                <MusicPlayer />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllBody;
