import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  StepBack,
  StepForward,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clickActiveSong,
  nextSong,
  playPause,
  prevSong,
} from "../../lib/playerSlice";
import { useEffect } from "react";

const Control = ({
  song,
  audioRef,
  i,
  data,
  currentTime,
  duration,
  repeat,
  setRepeat,
  setShuffle,
  shuffle,
}) => {
  const player = useSelector((state) => state.player);
  const handleShuffle = (e) => {
    // console.log(shuffle);
    // console.log(e.target.classList);
    setShuffle(!shuffle);
    if (repeat) {
      setRepeat(!repeat);
    }
  };
  const handleRepeat = (e) => {
    // console.log(shuffle);
    // console.log(e.target.classList);
    setRepeat(!repeat);
    if (shuffle) {
      setShuffle(!shuffle);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!shuffle && !repeat) {
      if (audioRef.current.currentTime === audioRef.current.duration) {
        dispatch(clickActiveSong({ song: data[i + 1], i: i + 1 }));
      }
    }

    if (shuffle) {
      document.getElementById("shuffle").classList.add("active");
      document.getElementById("repeat").classList.remove("active");
      if (audioRef.current.currentTime === audioRef.current.duration) {
        let randomInt = Math.floor(Math.random() * 24);
        if (randomInt === i) {
          randomInt = Math.floor(Math.random() * 24);
        }
        dispatch(clickActiveSong({ song: data[randomInt], i: randomInt }));
      }
      return;
    }
    if (repeat) {
      document.getElementById("repeat").classList.add("active");
      document.getElementById("shuffle").classList.remove("active");
      if (audioRef.current.currentTime === audioRef.current.duration) {
        console.log(repeat);
        dispatch(clickActiveSong({ song: song, i: i, repeat: repeat }));
      }
      return;
    }

    document.getElementById("shuffle").classList.remove("active");
    document.getElementById("repeat").classList.remove("active");
  }, [currentTime, duration, dispatch, shuffle, repeat]);

  return (
    <div className="flex items-center justify-center gap-4">
      <Shuffle
        id="shuffle"
        className="sp-icon-btn"
        onClick={(e) => handleShuffle(e)}
      />
      <StepBack
        className="sp-icon-btn"
        onClick={() => {
          dispatch(prevSong({ song, i, data, shuffle: shuffle }));
        }}
      />
      {player.isPlaying ? (
        <Pause
          className="sp-icon-btn active"
          onClick={() => dispatch(playPause({ audioRef, p: "pause" }))}
        />
      ) : (
        <Play
          className="sp-icon-btn active"
          onClick={() => dispatch(playPause({ audioRef, p: "play" }))}
        />
      )}

      <StepForward
        className="sp-icon-btn"
        onClick={() => dispatch(nextSong({ song, i, data, shuffle: shuffle }))}
      />
      <Repeat
        id="repeat"
        className="sp-icon-btn"
        onClick={(e) => handleRepeat(e)}
      />
    </div>
  );
};

export default Control;
