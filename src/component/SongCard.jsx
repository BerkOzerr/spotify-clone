import { useState } from "react";
import { useDispatch } from "react-redux";
import { clickActiveSong } from "../lib/playerSlice";
import { Play } from "lucide-react";

const SongCard = ({ song, i }) => {
  const { attributes, id } = song;
  const { name, artistName, artwork } = attributes;
  const { url } = artwork;
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      key={i}
      className="sp-card  "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => dispatch(clickActiveSong(song))}
    >
      <div className="flex relative  flex-row gap-4 hover:opacity-60 ease-in-out transition-all duration-200 delay-100">
        <img
          className="sp-card__image  hover:translate-[-2.5px] transition-all duration-75 delay-300 ease-linear"
          src={url}
          alt=""
        />
        <div className="flex flex-col overflow-hidden h-fit  gap-4 p-4 ">
          <div
            className={`flex  flex-col items-start justify-start p-2 gap-4 overflow-hidden `}
          >
            {hover ? (
              <marquee className="sp-card__subtitle  sm:text-xs ">
                {name}
              </marquee>
            ) : (
              <span className="sp-card__subtitle  sm:text-xs ">{name}</span>
            )}
          </div>
          <div
            className={`flex  flex-col items-start justify-start p-2 gap-4 overflow-hidden `}
          >
            {hover ? (
              <marquee className="sp-card__title lg:text-xl sm:text-xs ">
                {artistName}
              </marquee>
            ) : (
              <span className="sp-card__title lg:text-xl sm:text-xs ">
                {artistName}
              </span>
            )}
          </div>
        </div>
      </div>
      {hover ? <Play className="absolute top-1/2 right-1/2" /> : <></>}
    </div>
  );
};

export default SongCard;
