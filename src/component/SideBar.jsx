import { House, Image, UserStar, Hash } from "lucide-react";
import images from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playPause } from "../lib/playerSlice";
const SideBar = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(player.activeSong);
    dispatch(playPause());
  };
  return (
    <div className=" p-4 gap-4 flex flex-col    w-48 bg-[#1a1a1a71] h-full">
      <div className=" flex justify-center gap-4 my-10 flex-col items-center ">
        <img
          className="w-12 hover:opacity-40 cursor-pointer h-12 rounded-xl p-"
          src={images}
          alt="sidebar__logo"
        />
      </div>
      <div className="flex flex-row gap-2 cursor-pointer items-center hover:text-[#eeaeca] ">
        <Link
          onClick={() => handleClick()}
          className="flex gap-3  items-center "
          to={"/"}
        >
          <House size={20} /> Songs
        </Link>
      </div>
      {/* <div className="flex flex-row gap-2 cursor-pointer items-center hover:text-[#eeaeca]  ">
        <Link className="flex gap-3  items-center" to={"/"}>
          <Image size={20} /> Around You
        </Link>
      </div> */}
      <div className="flex flex-row gap-2 cursor-pointer items-center hover:text-[#eeaeca]  ">
        <Link
          onClick={() => handleClick()}
          className="flex gap-3  items-center"
          to={"/artist"}
        >
          <UserStar size={20} />
          Artists
        </Link>
      </div>
      {/* <div className="flex flex-row gap-2 cursor-pointer items-center hover:text-[#eeaeca]  ">
        <Link className="flex gap-3  items-center" to={"/"}>
          <Hash size={20} /> Top Chart
        </Link>
      </div> */}
    </div>
  );
};

export default SideBar;
