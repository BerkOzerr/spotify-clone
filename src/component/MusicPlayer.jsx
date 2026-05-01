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
} from "../lib/playerSlice";
import { useCallback, useEffect, useRef, useState } from "react";

const MusicPlayer = () => {
  const player = useSelector((state) => state.player);
  const { i, song } = player.activeSong;
  const { data } = player.songs[0];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  });
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

  useEffect(() => {
    dispatch(playPause({ audioRef, p: "play" }));
  }, [i, audioRef, dispatch]);
  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes} :${formattedSeconds}`;
  }
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

  useEffect(() => {
    audioRef?.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef?.current.addEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, handleTimeUpdate]);
  return (
    <div className="fixed w-full bottom-0 bg-[#1a1a1a71] h-fit ">
      <div className="flex items-center">
        <div key={song?.id} className="sp-now-playing">
          <div className="flex items-center justify-center gap-4">
            <img
              className="w-15 h-15 rounded-full"
              src={song?.attributes.artwork.url}
              alt="active_song_img"
            />
            <div className="flex flex-col items-center justify-center text-xs">
              <span>{song?.attributes.artistName}</span>
              <span>{song?.attributes.name}</span>
            </div>
          </div>
          <div className="flex flex-col  items-center justify-center">
            <div className="flex flex-col w-[70%] items-center justify-center">
              <input
                className="sp-slider w-full "
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
              />
              <audio ref={audioRef} src={song?.attributes.previews[0].url} />
              <div className="flex items-center justify-between w-full">
                <span className="sp-progress__time ">
                  {formatDuration(currentTime)}
                </span>
                <span className="sp-progress__time ">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>
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
                onClick={() =>
                  dispatch(nextSong({ song, i, data, shuffle: shuffle }))
                }
              />
              <Repeat
                id="repeat"
                className="sp-icon-btn"
                onClick={(e) => handleRepeat(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
