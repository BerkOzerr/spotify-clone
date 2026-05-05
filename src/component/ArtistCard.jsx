import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchSongs } from "../lib/playerSlice";
import Loader from "./Loader";

const ArtistCard = ({ artist, i }) => {
  //console.log(artist);

  const { attributes, id } = artist;
  const { artwork, name, genreNames, url } = attributes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log({ select: "SONGS", songName: name });
    dispatch(searchSongs({ select: "SONGS", songName: name }));
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        {/* <Link to={`/artist-details/${id}`}> */}
        <div
          onClick={() => handleClick()}
          className="flex cursor-pointer p-3 hover:opacity-40 transition-all duration-200 delay-150 ease-linear flex-col rounded-xl w-64 items-center justify-center  gap-4 bg-[#1a1a1a71] truncate"
        >
          <img
            className="w-3/4 rounded-[50%] hover:rounded-[40%] hover:-scale-x-100"
            src={artwork?.url}
            alt="artist_img "
          />
          <span className="font-bold italic ">{name}</span>
          {/* {genreNames.map((genre) => {
          return <span>{genre}</span>;
        })} */}
          <span>{genreNames}</span>
        </div>
        {/* </Link> */}
      </div>{" "}
    </>
  );
};

export default ArtistCard;
