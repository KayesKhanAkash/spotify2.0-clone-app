const Range = ({ duration, updateTime, onInput }) => {
  const parcent = () => {
    return updateTime / (duration / 100);
  };

  return (
    <div className="slide-container w-full min-w-[270px] h-[10px] relative md:w-auto">
      <div className="overflow-hidden relative w-full h-[4px] rounded-lg top-[50%] translate-y-[-50%]">
        <div
          className="slide absolute bg-white left-0 w-full h-full z-10 rounded-[99px]"
          style={{
            transform: `translateX(${-100 + parcent()}%)`,
          }}
        ></div>
        <div className="absolute bg-[#5E5E5E] left-0 w-full h-full rounded-[99px]"></div>
      </div>
      <input
        type="range"
        name="songTime"
        id="playerRange"
        step="any"
        onInput={onInput}
        max={duration}
        value={updateTime}
        className="playerRange"
      />
    </div>
  );
};

export default Range;
