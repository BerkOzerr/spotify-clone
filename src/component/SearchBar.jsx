import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchSongs } from "../lib/playerSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const [searchingSong, setSearchingSong] = useState({ select: "SONGS" });

  //console.log(player);
  const handleChange = (e) => {
    setSearchingSong({ ...searchingSong, songName: e.target.value });
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    //console.log(searchingSong.select);
    if (!searchingSong.songName || searchingSong.songName === "") {
      console.log(searchingSong);
      return;
    }
    dispatch(searchSongs(searchingSong));
  };
  const handleSelectValue = (e) => {
    e.preventDefault();
    setSearchingSong({ ...searchingSong, select: e.target.value });
  };
  // useEffect(() => {
  //   //console.log(searchingSong);
  // }, [searchingSong]);
  //console.log(player?.songs[0]);
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative items-center justify-center flex ">
        <Search
          onClick={(e) => searchSubmit(e)}
          className="absolute right-1   cursor-pointer hover:stroke-indigo-200 animate-pulse"
        />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          className="bg-[#1a1a1a]  shadow-md shadow-[#1a1a1a]  py-3  truncate  placeholder:truncate px-8 outline-none hover:border-none focus:border-none rounded-3xl   w-64"
          placeholder={player?.songs[0]?.data[0]?.attributes.artistName}
        />
      </div>
      <div className="flex relative items-center justify-center w-fit">
        <select
          className="bg-[#1a1a1a]  p-2 truncate hover:opacity-0.6 rounded-3xl shadow-md shadow-[#1a1a1a] hover:opacity-75"
          name="selection"
          onClick={(e) => handleSelectValue(e)}
        >
          <option
            className="hover:bg-indigo-300 hover:opacity-50"
            value="SONGS"
          >
            Song
          </option>
          <option
            className="hover:bg-indigo-300 hover:opacity-50"
            value="ARTISTS"
          >
            Artist
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
