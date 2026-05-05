import { useDispatch, useSelector } from "react-redux";
import { playPause } from "../../lib/playerSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import Control from "./Control";
import VolumeBar from "./VolumeBar";
import ArtistTitle from "./ArtistTitle";
import SeekBar from "./SeekBar";

const MusicPlayer = () => {
  const player = useSelector((state) => state.player);
  const { i, song } = player.activeSong;
  const data = player.songs[0]?.data;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(true);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const root = document.documentElement;
    const totalTime = Math.floor((100 / duration) * currentTime);
    // console.log(Math.floor(totalTime));
    root.style.setProperty("--volume", `${volume * 100}%`);
    root.style.setProperty("--progress", `${totalTime}%`);
  }, [volume, currentTime]);

  useEffect(() => {
    dispatch(playPause({ audioRef, p: "play" }));
  }, [i, audioRef, dispatch]);

  return (
    <div className="fixed w-full bottom-0 bg-[#1a1a1a71] h-fit ">
      <audio
        loop={repeat}
        ref={audioRef}
        src={song?.attributes.previews[0].url}
      />
      <div className="flex items-center">
        <div key={song?.id} className="sp-now-playing">
          <ArtistTitle song={song} />
          <div className="flex flex-col  items-center justify-center gap-2 mx-2">
            <SeekBar
              currentTime={currentTime}
              duration={duration}
              audioRef={audioRef}
              setCurrentTime={setCurrentTime}
              setDuration={setDuration}
            />
            <Control
              audioRef={audioRef}
              song={song}
              i={i}
              data={data}
              currentTime={currentTime}
              duration={duration}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              setShuffle={setShuffle}
            />
          </div>
          <div className="flex items-center justify-center gap-3 w-fit mx-2">
            <VolumeBar
              volume={volume}
              setVolume={setVolume}
              display={display}
              setDisplay={setDisplay}
              audioRef={audioRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
