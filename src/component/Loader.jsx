const Loader = () => {
  return (
    <div className="relative h-120 ">
      <div className="absolute top-[50%] left-[50%] ">
        <Loader size={64} className="animate-spin" />
        <span className="animate-ping ">Loading ...</span>
      </div>
    </div>
  );
};

export default Loader;
