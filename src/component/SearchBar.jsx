import { Search } from "lucide-react";
import { useEffect, useState } from "react";
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

  return (
    <div className="relative items-center justify-center flex ">
      <Search
        onClick={(e) => searchSubmit(e)}
        className="absolute right-1   cursor-pointer hover:stroke-indigo-200 animate-pulse"
      />
      <input
        onChange={(e) => handleChange(e)}
        type="text"
        className="bg-[#1a1a1a]  py-3  truncate  placeholder:truncate px-8 outline-none hover:border-none focus:border-none rounded-3xl   w-64"
        placeholder={player.songs[0].data[0].attributes.composerName}
      />
    </div>
  );
};

export default SearchBar;
