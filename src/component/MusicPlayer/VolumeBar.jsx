import { Volume, VolumeOff } from "lucide-react";
import { useEffect } from "react";

const VolumeBar = ({ volume, setVolume, display, setDisplay, audioRef }) => {
  const settingVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    //console.log(newVolume);
    setVolume(newVolume);
  };

  const handleVolumeClick = () => {
    setDisplay(!display);
    // console.log(display);
  };
  useEffect(() => {
    if (display) {
      audioRef.current.volume = volume;
      return;
    }
    audioRef.current.volume = 0;
  }, [display, volume]);

  return (
    <>
      {display ? (
        <>
          <Volume
            className="sp-icon-btn w-12 "
            size={32}
            onClick={() => handleVolumeClick()}
          />
          <span className="text-xs">{Math.round(volume * 100)}%</span>
          <div className="relative flex items-start justify-center flex-col gap-4">
            <div className="volume-progress"></div>
            <input
              id="sp-slider-volume"
              className={`sp-slider-volume`}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => settingVolume(e)}
            />
          </div>
        </>
      ) : (
        <>
          <VolumeOff
            className="sp-icon-btn "
            size={32}
            onClick={() => handleVolumeClick()}
          />
        </>
      )}
    </>
  );
};

export default VolumeBar;
