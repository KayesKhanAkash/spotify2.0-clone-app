import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHexColorCode } from "../../../Redux/Slice/PlayerSlice";
import { getAverageHex, msToMin } from "../../Helper/Functions";
import { Link } from "react-router-dom";

const TrackHero = ({ singleTrack, artist }) => {
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const handleRgb = () => {
    dispatch(getHexColorCode(getAverageHex(imgRef.current)));
  };

  return (
    <div
      className="hero-area w-full px-4 pb-7 pt-28 md:px-6"
      style={{
        background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${hexColorCode}`,
      }}
    >
      <div className="flex gap-8 items-center flex-col md:flex-row md:items-end">
        <div className="flex flex-[0.3] items-end max-w-[220px] min-w-[220px] max-h-[223px] shadow-[0px_4px_60px_rgba(0,_0,_0,_.5)]">
          <img
            src={singleTrack?.album?.images[0].url}
            alt="songs-thumbail"
            ref={imgRef}
            onLoad={handleRgb}
            crossOrigin=""
          />
        </div>
        <div className="self-start text-sm md:flex-[0.7] md:w-auto md:self-end">
          <p className="capitalize text-white mb-5">{singleTrack?.type}</p>
          {singleTrack?.name?.length <= 8 ? (
            <h1
              className="text-7xl font-bold my-4 capitalize md:text-5xl lg:text-7xl"
              title={singleTrack?.name}
            >
              {singleTrack?.name}
            </h1>
          ) : singleTrack?.name?.length <= 19 ? (
            <h1
              className="text-[2rem] leading-snug font-bold my-4 capitalize md:text-[2.8rem]"
              title={singleTrack?.name}
            >
              {singleTrack?.name}
            </h1>
          ) : (
            <h1
              className="text-5xl font-bold my-4 capitalize text-overflow xl:text-6xl"
              title={singleTrack?.name}
            >
              {singleTrack?.name}
            </h1>
          )}

          <div className="mt-3">
            <div className="flex flex-wrap gap-1 items-center text-white">
              <div className="img h-5 w-5 rounded-full overflow-hidden">
                <img
                  src={artist?.images[2]?.url}
                  alt="artist"
                  className="object-cover"
                />
              </div>
              <Link
                to={`/artist/${singleTrack?.artists[0]?.id}`}
                className="hover:underline capitalize"
              >
                <span>{singleTrack?.artists[0]?.name}</span>
              </Link>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="text-text_color">
                {msToMin(singleTrack?.duration_ms)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackHero;
