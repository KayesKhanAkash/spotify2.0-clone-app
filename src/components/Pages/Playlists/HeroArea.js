import React, { useRef } from "react";
import { BsMusicNoteBeamed, BsSpotify } from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatNumber, getAverageHex, msToHrmin } from "../../Helper/Functions";
import { useDispatch, useSelector } from "react-redux";
import { getHexColorCode } from "../../../Redux/Slice/PlayerSlice";

const HeroArea = ({ singlePlaylist }) => {
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const handleRgb = () => {
    dispatch(getHexColorCode(getAverageHex(imgRef.current)));
  };

  // duration

  const duration_ms = singlePlaylist?.tracks?.items?.map((item) => {
    return item?.track?.duration_ms;
  });

  const total = duration_ms?.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  return (
    <div
      className="hero-area w-full px-6 pb-7 pt-28"
      style={{
        background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${hexColorCode}`,
      }}
    >
      <div className="flex gap-8 flex-col items-center md:items-end md:flex-row">
        <div className="flex flex-[0.3] max-w-[220px] min-w-[220px] min-h-[220px] max-h-[223px] shadow-[0px_4px_60px_rgba(0,_0,_0,_.5)]">
          {singlePlaylist?.coverImg[0]?.url ? (
            <img
              src={singlePlaylist?.coverImg[0]?.url}
              alt="songs-thumbail"
              ref={imgRef}
              onLoad={handleRgb}
              crossOrigin=""
            />
          ) : (
            <div className="flex justify-center items-center w-full bg-[#383838]">
              <BsMusicNoteBeamed className="h-full w-[50%]" />
            </div>
          )}
        </div>
        <div className="flex-[0.7] self-start text-sm md:self-end">
          <p className="capitalize text-white mb-5">{singlePlaylist?.type}</p>
          {singlePlaylist?.name?.length <= 8 ? (
            <h1
              className="text-7xl font-bold my-4 capitalize"
              title={singlePlaylist?.name}
            >
              {singlePlaylist?.name}
            </h1>
          ) : singlePlaylist?.name?.length <= 19 ? (
            <h1
              className="text-[2rem] leading-snug font-bold my-4 capitalize md:text-[2.8rem]"
              title={singlePlaylist?.name}
            >
              {singlePlaylist?.name}
            </h1>
          ) : (
            <h1
              className="text-5xl font-bold my-4 capitalize text-overflow xl:text-6xl"
              title={singlePlaylist?.name}
            >
              {singlePlaylist?.name}
            </h1>
          )}

          <p className="mt-8">{singlePlaylist?.description}</p>
          <div className="mt-3">
            <p className="flex flex-wrap gap-1 items-center text-white">
              <BsSpotify className="fill-primary text-lg" />
              <Link className="text-sm">
                {singlePlaylist?.owner?.display_name}
              </Link>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span>
                {formatNumber(singlePlaylist?.followers?.total)} likes
              </span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span>{singlePlaylist?.tracks?.total} songs,</span>
              <span className="text-text_color">about {msToHrmin(total)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
