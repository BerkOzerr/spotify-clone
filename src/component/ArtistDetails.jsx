import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import ArtistDiscover from "./ArtistDiscover";
import { useEffect, useState } from "react";

const ArtistDetails = () => {
  const player = useSelector((state) => state.player);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchId, setSearchId] = useState({});
  useEffect(() => {
    // console.log(player.artists[0].data);
    // console.log(id);
    const itemIndex = player.artists[0]?.data.findIndex(
      (item) => item.id === id,
    );
    setSearchId(player.artists[0]?.data[itemIndex]);
  }, [id]);
  console.log(searchId);
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
          {searchId?.attributes?.name}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
