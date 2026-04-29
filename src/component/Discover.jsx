import { useSelector } from "react-redux";
import SongCard from "./SongCard";
const Discover = () => {
  const player = useSelector((state) => state.player);
  return (
    <div className="flex  w-full">
      <div className="grid   lg:h-full lg:w-full lg:p-12 sm:p-2 lg:grid-cols-3 sm:grid-cols-1 sm:gap-2 lg:gap-4 ">
        {player.songs[0].data.map((song, index) => {
          return <SongCard i={index} key={song.id} song={song} />;
        })}
      </div>
    </div>
  );
};

export default Discover;
