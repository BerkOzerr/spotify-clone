import { Search } from "lucide-react";
import { useState } from "react";
import { searchSongs } from "../lib/playerSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const [searchingSong, setSearchingSong] = useState("");

  //console.log(player);
  const handleChange = (e) => {
    setSearchingSong(e.target.value);
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchSongs(searchingSong));
  };
  console.log(player?.songs[0]);
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
          className="bg-[#1a1a1a]  py-3  truncate  placeholder:truncate px-8 outline-none hover:border-none focus:border-none rounded-3xl   w-64"
          placeholder={player?.songs[0]?.data[0]?.attributes.artistName}
        />
      </div>
      <div className="selection-search-bar">
        <select className="  " name="selection">
          <option value="SONGS">Song</option>
          <option value="ARTISTS">Artist</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
