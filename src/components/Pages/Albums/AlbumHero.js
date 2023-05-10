import React, { useRef } from "react";
import { BsSpotify } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAverageHex, msToHrmin } from "../../Helper/Functions";
import { getHexColorCode } from "../../../Redux/Slice/PlayerSlice";

const AlbumHero = () => {
  const { singleAlbum } = useSelector((state) => state.DataLayerSlice);
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const handleRgb = () => {
    dispatch(getHexColorCode(getAverageHex(imgRef.current)));
  };

  const duration_ms = singleAlbum?.tracks?.items?.map((item) => {
    return item?.duration_ms;
  });

  const total = duration_ms?.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  return (
    <div
      className={`hero-area w-full px-6 pb-7 pt-28`}
      style={{
        background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${hexColorCode}`,
      }}
    >
      <div className="flex gap-8 flex-col items-center md:items-end md:flex-row">
        <div className="flex flex-[0.3] items-end max-w-[220px] min-w-[220px] max-h-[223px] shadow-[0px_4px_60px_rgba(0,_0,_0,_.5)]">
          <img
            src={singleAlbum?.images[0]?.url}
            alt="songs-thumbail"
            ref={imgRef}
            onLoad={handleRgb}
            crossOrigin=""
          />
        </div>
        <div className="flex-[0.7] self-start text-sm md:self-end">
          <p className="capitalize text-white mb-5">{singleAlbum?.type}</p>
          {singleAlbum?.name?.length <= 8 ? (
            <h1
              className="text-7xl font-bold my-4 capitalize md:text-5xl lg:text-7xl"
              title={singleAlbum?.name}
            >
              {singleAlbum?.name}
            </h1>
          ) : singleAlbum?.name?.length <= 19 ? (
            <h1
              className="leading-snug text-[2.8rem] font-bold my-4 capitalize"
              title={singleAlbum?.name}
            >
              {singleAlbum?.name}
            </h1>
          ) : (
            <h1
              className="text-5xl font-bold my-4 capitalize text-overflow xl:text-6xl"
              title={singleAlbum?.name}
            >
              {singleAlbum?.name}
            </h1>
          )}

          <p className="mt-8">{singleAlbum?.description}</p>
          <div className="mt-3">
            <p className="flex flex-wrap gap-1 items-center text-white">
              <BsSpotify className="fill-primary text-lg" />
              <Link className="text-sm">{singleAlbum?.artists[0]?.name}</Link>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span>{singleAlbum?.release_date.split("-")[0]}</span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span>{singleAlbum?.tracks?.total} songs,</span>
              <span className="text-text_color">about {msToHrmin(total)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumHero;
