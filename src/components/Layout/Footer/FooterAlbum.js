import React from "react";
import { BsSuitHeart } from "react-icons/bs";
import { MdOutlinePictureInPictureAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMobilePlayerOpen } from "../../../Redux/Slice/PlayerSlice";

const FooterAlbum = ({ currentSong, isPlaying, dispatch }) => {
  const { currentPlaylist } = useSelector((state) => state.PlayerSlice);

  const image = currentPlaylist?.images
    ? currentPlaylist?.images[0]?.url
    : currentSong?.album?.images[1]?.url;

  return (
    <div className="flex gap-5 flex-col items-center md:flex-row">
      <div
        className={`${
          isPlaying ? "md:slowlySpin" : ""
        } h-[40vh] min-h-[300px] w-full overflow-hidden md:min-h-[60px] md:max-h-[60px] md:min-w-[60px] md:rounded-full md:w-[60px] md:h-[60px]`}
      >
        <img src={image} alt="albumLogo" className="object-cover" />
      </div>

      <div className="flex gap-2 items-center justify-between w-full md:max-w-[300px]">
        <div className="relative overflow-hidden whitespace-nowrap w-full md:max-w-[100px]">
          <div
            className="absolute top-0 right-0 w-4 h-full hidden md:block"
            style={{
              background: `linear-gradient(to right, rgba(0,0,0,0.3), transparent)`,
            }}
          ></div>
          <h4 className={`text-sm text-white hover:underline`}>
            <Link
              to={`/track/${currentSong?.id}`}
              className={`${
                currentSong?.name?.length > 12 ? "trackTitle" : ""
              } text-xl whitespace-nowrap capitalize block text-white hover:underline md:text-sm`}
              onClick={() => {
                dispatch(setMobilePlayerOpen(false));
              }}
            >
              {currentSong?.name}
            </Link>
          </h4>
          <h5
            className={`${
              currentSong?.artists.join(", ").length > 20 ? "trackTitle" : ""
            } text-base text-text_color mt-1.5 md:text-xs`}
          >
            {currentSong?.artists?.map((artist, idx, arr) => (
              <span key={artist?.id}>
                <Link
                  to={`/artist/${artist?.id}`}
                  className="hover:underline capitalize hover:text-white"
                  onClick={() => {
                    dispatch(setMobilePlayerOpen(false));
                  }}
                >
                  {artist.name}
                  {arr.length > 1 && idx !== arr.length - 1 ? (
                    <span>, </span>
                  ) : null}
                </Link>
              </span>
            ))}
          </h5>
        </div>

        {/* icons */}
        <div className="flex gap-3 justify-center ml-4">
          <BsSuitHeart className="text-2xl md:text-base" />
          <MdOutlinePictureInPictureAlt className="hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default FooterAlbum;
