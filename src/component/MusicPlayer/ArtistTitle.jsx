const ArtistTitle = ({ song }) => {
  return (
    <div className="flex items-center justify-center gap-4 mx-2">
      <img
        className="w-15 h-15 rounded-full truncate"
        src={song?.attributes.artwork.url}
        alt="active_song_img"
      />
      <div className="flex w-fit flex-col items-center overflow-wrap truncate justify-center text-xs">
        <span className="truncate   text-wrap  overflow-hidden  text-center">
          {song?.attributes.artistName}
        </span>
        <span className="truncate   text-wrap  overflow-hidden text-center">
          {song?.attributes.name}
        </span>
      </div>
    </div>
  );
};

export default ArtistTitle;
