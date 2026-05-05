import { useSelector } from "react-redux";
import ArtistCard from "./ArtistCard";

const ArtistDiscover = () => {
  const player = useSelector((state) => state.player);
  // console.log(player.artists[0].data);
  return (
    <div className="flex  w-full">
      <div className="grid   lg:h-full lg:w-full lg:p-12 sm:p-2 lg:grid-cols-3 sm:grid-cols-2 sm:gap-2 lg:gap-4 ">
        {player?.artists[0]?.data?.map((artist, index) => {
          return <ArtistCard i={index} key={artist.id} artist={artist} />;
        })}
      </div>
    </div>
  );
};

export default ArtistDiscover;
