import React, { useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GoKebabHorizontal } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { clickToClose, fromNow, msToMin } from "../../Helper/Functions";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCurrentPlaylist,
  setPlaying,
} from "../../../Redux/Slice/PlayerSlice";
import PlayingAnim from "./PlayingAnim";
import { getSavedTracksIds } from "../../../Redux/Slice/DataLayerSlice";
import SongMenu from "./SongMenu";
import { styles } from "../../../Utils/commonStyles";

const Track = ({ index, item, playlist, playlistId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [_show, set_show] = useState(false); // for mobile song menu
  const menuRef = useRef(null);
  const { isPlaying, currentSong } = useSelector((state) => state.PlayerSlice);

  const itemId = item?.track?.id || item?.id;
  const itemUrl = item?.track?.preview_url || item?.preview_url;
  const duration = item?.track?.duration_ms || item?.duration_ms;
  const itemName = item?.track?.name || item?.name;
  const itemArtists = item?.track?.artists || item?.artists;

  const location = useLocation();

  const checkLoaction = location.pathname.includes("playlists");
  const locationSearch = location.pathname.includes("search");
  const locationTrack = location.pathname.includes("track");

  return (
    <div
      className={`${
        isPlaying && currentSong?.id === itemId
          ? "[&_.playIcon]:hover:hidden [&_.pauseIcon]:hover:block"
          : "[&_.playIcon]:hover:block [&_.pauseIcon]:hover:hidden"
      } ${
        itemUrl
          ? "list-none [&_.num]:hover:hidden"
          : "[&_.num]:hover:block opacity-50"
      } ${
        locationSearch ? "[&_.icons]:hover:bg-[#00000086]" : ""
      } [&_.icons]:hover:text-white hover:bg-[#2e363d] [&_.heart]:hover:visible [&_.menu]:hover:visible [&_.playingAnim]:hover:hidden [&_.icons]:hover:flex`}
      key={item?.id}
    >
      <div
        className={`${
          locationSearch ? "px-2" : styles.paddingX
        } grid grid-cols-12 gap-3 content-between items-center py-3 text-sm`}
      >
        <div className={`${locationSearch ? "col-span-2" : "col-span-1"}`}>
          <div
            className={`${
              locationSearch
                ? "min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] h-[40px] w-[40px] justify-center items-center"
                : "justify-start"
            } flex items-center h-5 w-5`}
            style={
              locationSearch
                ? { background: `url(${item?.album?.images[2]?.url})` }
                : null
            }
          >
            {/* playing animation and number */}
            <div>
              {isPlaying && currentSong?.id === itemId ? (
                <PlayingAnim />
              ) : (
                <span
                  className={`${
                    currentSong?.id === itemId
                      ? "text-primary"
                      : "text-text_color block"
                  } num ${locationSearch ? "hidden" : "block"}`}
                >
                  {index + 1}
                </span>
              )}
            </div>
            <div className="icons w-full h-full hidden justify-center items-center">
              {itemUrl ? (
                <BsPlayFill
                  className={`playIcon w-5 h-5 text-lg cursor-pointer hidden`}
                  onClick={() => {
                    dispatch(setPlaying(true));
                    dispatch(
                      handleCurrentPlaylist({
                        currentPlaylist: { ...playlist?.tracks },
                        currentSong: item,
                        index: index,
                      })
                    );
                  }}
                />
              ) : null}

              <BsPauseFill
                className={`pauseIcon w-5 h-5 cursor-pointer text-lg hidden`}
                onClick={() => {
                  dispatch(setPlaying(false));
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            locationSearch
              ? "col-span-7 lg:col-span-7"
              : "col-span-9 sm:col-span-6 lg:col-span-4"
          } flex items-center gap-2`}
        >
          {checkLoaction || locationTrack ? (
            <div className="img min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] h-[40px] w-[40px] overflow-hidden">
              <img
                src={
                  item?.track?.album?.images[2]?.url ||
                  item?.album?.images[2]?.url
                }
                alt="track-img"
              />
            </div>
          ) : null}

          <div className="overflow-hidden">
            <Link
              to={`/track/${itemId}`}
              className={`${
                currentSong?.id === itemId ? "text-primary" : "text-white"
              } text-overflow capitalize hover:underline`}
            >
              {itemName}
            </Link>
            {!locationTrack && (
              <p className="text-overflow text-xs mt-1">
                {itemArtists?.map((artist, idx, arr) => (
                  <span key={artist?.id}>
                    <Link
                      to={`/artist/${artist?.id}`}
                      className="hover:underline capitalize hover:text-white"
                    >
                      {artist.name}
                      {arr.length > 1 && idx !== arr.length - 1 ? (
                        <span>, </span>
                      ) : null}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        {!locationSearch && (
          <>
            <div className="col-span-3 hidden sm:block">
              <Link
                to={`/albums/${item?.track?.album?.id}`}
                className="hover:underline text-overflow hover:text-white"
              >
                {item?.track?.album?.name}
              </Link>
            </div>

            <div className="col-span-2 hidden lg:block">
              {fromNow(new Date(item?.added_at))}
            </div>
          </>
        )}

        <div className="col-span-2 flex gap-4 items-center justify-end md:justify-center">
          <span
            className="heart invisible cursor-pointer hidden md:block"
            onClick={() => {
              dispatch(getSavedTracksIds(itemId));
            }}
          >
            <FiHeart />
          </span>
          <span className="hidden md:block">{msToMin(duration)}</span>
          <div className={`song-menu flex items-center relative`} ref={menuRef}>
            <button
              type="button"
              className="song-menu-btn menu visible rotate-90 cursor-pointer md:invisible md:rotate-0"
              onClick={() => {
                clickToClose(
                  show,
                  setShow,
                  menuRef,
                  ".song-menu",
                  ".song-menu-btn"
                );
                set_show(true);
              }}
            >
              <GoKebabHorizontal />
            </button>
            <SongMenu
              show={show}
              _show={_show}
              set_Show={set_show}
              itemName={itemName}
              albumId={item?.track?.album?.id || item?.album?.id}
              artists={itemArtists}
              playlistId={playlistId}
              externalUrls={item?.external_urls?.spotify}
              uri={item?.uri || item?.track?.uri}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
