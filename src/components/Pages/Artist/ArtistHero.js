import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHexColorCode } from "../../../Redux/Slice/PlayerSlice";
import { formatNumber, getAverageHex } from "../../Helper/Functions";

const ArtistHero = ({ artist }) => {
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const handleRgb = () => {
    dispatch(getHexColorCode(getAverageHex(imgRef.current)));
  };

  return (
    <div
      className="artist-hero w-full px-6 pb-7 pt-28"
      style={{
        background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${hexColorCode}`,
      }}
    >
      <div className="flex gap-8 flex-col items-center md:items-end md:flex-row">
        <div className="flex flex-[0.3] items-end min-h-[220px] max-w-[220px] min-w-[220px] max-h-[220px] shadow-[0px_4px_60px_rgba(0,_0,_0,_.5)] rounded-full overflow-hidden">
          <img
            src={artist?.images[0]?.url}
            alt="songs-thumbail"
            ref={imgRef}
            onLoad={handleRgb}
            crossOrigin=""
          />
        </div>
        <div className="flex-[0.7] self-start md:self-end">
          <p className="capitalize text-white mb-4">{artist?.type}</p>
          {artist?.name?.length <= 8 ? (
            <h1
              className="text-7xl font-bold my-4 capitalize"
              title={artist?.name}
            >
              {artist?.name}
            </h1>
          ) : artist?.name?.length <= 19 ? (
            <h1
              className="text-[2rem] leading-snug font-bold my-4 capitalize md:text-[2.8rem]"
              title={artist?.name}
            >
              {artist?.name}
            </h1>
          ) : (
            <h1
              className="text-5xl font-bold my-4 capitalize text-overflow xl:text-6xl"
              title={artist?.name}
            >
              {artist?.name}
            </h1>
          )}

          <p className="mt-7 text-white font-semibold">
            {formatNumber(artist?.followers?.total)} monthly listeners
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistHero;
