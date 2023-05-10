import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePlayLists } from "../../../Redux/Slice/DataLayerSlice";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { FiHeart } from "react-icons/fi";
import PlayButton from "./PlayButton";
import { GoKebabHorizontal } from "react-icons/go";
import { BiTimeFive } from "react-icons/bi";
import Track from "./Track";
import HeroArea from "./HeroArea";
import LoadingForPlaylist from "../../Loading/LoadingForPlaylist";

const PlayLists = () => {
  const spotify = new SpotifyWebApi();

  const { singlePlaylist } = useSelector((state) => state.DataLayerSlice);
  const { isScroll, hexColorCode } = useSelector((state) => state.PlayerSlice);
  const playlistNav = useRef(null);

  const dispatch = useDispatch();
  const { playlistsId } = useParams();

  useEffect(() => {
    spotify.getPlaylist(playlistsId).then((playlist) => {
      spotify.getPlaylistCoverImage(playlistsId).then((img) => {
        dispatch(getSinglePlayLists({ ...playlist, coverImg: img }));
      });
    });

    return () => null;
  }, [playlistsId]);

  return singlePlaylist ? (
    <section className="playlist">
      <div className="playlist-container">
        <HeroArea singlePlaylist={singlePlaylist} />
        {/* buttons */}
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-full h-[200px]"
            style={{
              background: `linear-gradient(rgba(0,0,0,.6) 0, #121212 100%), ${hexColorCode}`,
            }}
          ></div>
          <div className="flex gap-6 items-center z-10 relative py-6 px-6">
            <PlayButton
              className={"w-12 h-12"}
              playlist={singlePlaylist?.tracks}
              playlistId={playlistsId}
            />
            <FiHeart className="w-8 h-8" />
            <GoKebabHorizontal className="w-7 h-7" />
          </div>

          {/* tracks */}

          <div className="track-container">
            {/* tracks */}

            <ul className="relative">
              <li
                className={`${
                  isScroll ? "bg-[#121212]" : "bg-transparent"
                } px-6 sticky top-[70px] z-[11] transition-colors duration-500`}
                ref={playlistNav}
              >
                <div className="grid grid-cols-12 gap-5 items-center py-3 border-b border-b-gray-600">
                  <div className="col-span-1">#</div>
                  <div className="col-span-8 sm:col-span-6 lg:col-span-4">
                    Title
                  </div>
                  <div className="col-span-3 hidden sm:block">Album</div>
                  <div className="col-span-2 whitespace-nowrap hidden lg:block">
                    Date added
                  </div>
                  <div className="col-span-2 hidden justify-center md:flex">
                    <BiTimeFive />
                  </div>
                </div>
              </li>

              {singlePlaylist?.tracks?.items?.map((item, index) => (
                <li key={item?.track?.id + index}>
                  <Track
                    item={item}
                    playlist={singlePlaylist}
                    index={index}
                    playlistId={playlistsId}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <LoadingForPlaylist />
  );
};

export default PlayLists;
