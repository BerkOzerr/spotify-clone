import { useCallback, useEffect } from "react";

const SeekBar = ({
  setDuration,
  duration,
  currentTime,
  audioRef,
  setCurrentTime,
}) => {
  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  });
  useEffect(() => {
    audioRef?.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef?.current.addEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, handleTimeUpdate]);
  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes} :${formattedSeconds}`;
  }

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  return (
    <div className="flex flex-col w-full items-center justify-center gap-1">
      <div className="flex items-center justify-between w-full">
        <span className="sp-progress__time ">
          {formatDuration(currentTime)}
        </span>
        <span className="sp-progress__time ">{formatDuration(duration)}</span>
      </div>

      <div className="flex flex-col relative items-center justify-center w-full">
        <div className="sp-slider--progress animate-pulse "></div>
        <input
          id="slider-input"
          className="sp-slider w-full"
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>
    </div>
  );
};

export default SeekBar;
