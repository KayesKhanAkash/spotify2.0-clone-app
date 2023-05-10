import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { getSingleAlbum } from "../../../Redux/Slice/DataLayerSlice";
import AlbumHero from "./AlbumHero";
import PlayButton from "../Playlists/PlayButton";
import { FiHeart } from "react-icons/fi";
import { GoKebabHorizontal } from "react-icons/go";
import Track from "../Playlists/Track";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { dateFormat } from "../../Helper/Functions";
import LoadingForPlaylist from "../../Loading/LoadingForPlaylist";

const Albums = () => {
  const spotify = new SpotifyWebApi();
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const { isScroll, hexColorCode } = useSelector((state) => state.PlayerSlice);
  const { singleAlbum } = useSelector((state) => state.DataLayerSlice);
  const playlistNav = useRef(null);
  const location = useLocation();

  const checkLocation = location.pathname.includes("playlists");

  useEffect(() => {
    spotify.getAlbum(albumId).then((album) => {
      dispatch(getSingleAlbum(album));
    });

    return () => null;
  }, [albumId]);

  return singleAlbum ? (
    <div className="album">
      <div className="album-container">
        <AlbumHero />
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-full h-[200px]"
            style={{
              background: `linear-gradient(rgba(0,0,0,.6) 0, #121212 100%), ${hexColorCode}`,
            }}
          ></div>
          {/* play pause button */}
          <div className="flex gap-6 items-center z-10 relative py-6 px-6">
            <PlayButton
              className={"w-12 h-12"}
              albumPlaylist={{
                ...singleAlbum?.tracks,
                images: singleAlbum?.images,
              }}
              playlistId={albumId}
            />
            <FiHeart className="w-8 h-8" />
            <GoKebabHorizontal className="w-7 h-7" />
          </div>

          {/* tracks */}

          <div className="track-container">
            <ul className="relative">
              {/* track navigation */}

              <li
                className={`${
                  isScroll ? "bg-[#121212]" : "bg-transparent"
                } px-6 sticky top-[70px] z-[11] transition-colors duration-500`}
                ref={playlistNav}
              >
                <div className="grid grid-cols-12 gap-5 items-center py-3 border-b border-b-gray-600">
                  <div className="col-span-1">#</div>
                  <div className={checkLocation ? "col-span-4" : "col-span-9"}>
                    Title
                  </div>
                  {checkLocation && (
                    <>
                      <div className="col-span-3">Album</div>
                      <div className="col-span-2 hidden md:block">
                        Date added
                      </div>
                    </>
                  )}
                  <div className="hidden col-span-2 md:flex justify-center">
                    <BiTimeFive />
                  </div>
                </div>
              </li>

              {singleAlbum?.tracks?.items?.map((item, index) => (
                <li key={item?.id + index}>
                  <Track
                    item={item}
                    index={index}
                    playlist={singleAlbum?.tracks}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* copy rights */}

        <div className="copyRight mt-14 px-6">
          <p className="mb-1 text-sm">
            {dateFormat(singleAlbum?.release_date)}
          </p>
          {singleAlbum?.copyrights?.map((item, index) => (
            <p
              className="text-xs leading-relaxed flex items-center gap-1"
              key={index}
            >
              <span>
                <AiOutlineCopyrightCircle />
              </span>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <LoadingForPlaylist />
  );
};

export default Albums;
