import React from "react";
import { Link } from "react-router-dom";
import {
  handleCurrentPlaylist,
  setPlaying,
} from "../../../Redux/Slice/PlayerSlice";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { removeRecentSearches } from "../../../Redux/Slice/DataLayerSlice";
import { RxCross1 } from "react-icons/rx";
import { LoadingForTrack } from "../../Loading/LoadingItems";
import { BsMusicNoteBeamed } from "react-icons/bs";

const MusicCart = ({
  img,
  title,
  description,
  playlistId,
  artists,
  albumTracks,
  albumId,
  year,
  type,
  isSearch,
}) => {
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();
  const { currentPlaylist, isPlaying } = useSelector(
    (state) => state.PlayerSlice
  );

  const handlePlaylists = () => {
    if (playlistId) {
      spotify.getPlaylistTracks(playlistId).then((tracks) => {
        dispatch(
          handleCurrentPlaylist({
            currentPlaylist: { ...tracks, name: title },
            currentSong: tracks?.items[0],
            index: 0,
          })
        );
      });
    } else if (albumTracks) {
      dispatch(
        handleCurrentPlaylist({
          currentPlaylist: {
            ...albumTracks,
            name: title,
            images: [{ url: img }],
          },
          currentSong: albumTracks?.items[0],
          index: 0,
        })
      );
    } else if (albumId && !albumTracks) {
      spotify.getAlbumTracks(albumId).then((tracks) => {
        dispatch(
          handleCurrentPlaylist({
            currentPlaylist: { ...tracks, name: title, images: [{ url: img }] },
            currentSong: tracks?.items[0],
            index: 0,
          })
        );
      });
    } else {
      return;
    }
  };

  const names = artists?.map((item) => item.name);

  const idCheck = playlistId || albumId;

  const href = playlistId ? `/playlists/${playlistId}` : `/albums/${albumId}`;

  const content =
    year && type ? (
      <p className="flex items-center capitalize">
        <span>{year}</span>
        <span className="h-1 w-1 rounded-full bg-text_color inline-block mx-1"></span>
        <span>{type}</span>
      </p>
    ) : (
      description || names?.join(", ")
    );

  return title ? (
    <div className="music-cart relative mx-auto [&_.icon]:hover:opacity-100 [&_.icon]:hover:top-[40%] rounded-lg overflow-hidden hover:-translate-y-2 transition-transform">
      <Link to={href}>
        <div className="bg-[#181818] p-3 min-h-[260px] max-h-[260px] hover:bg-[#262626] transition-colors md:p-4">
          <div className="img max-h-[150px] h-[140px] overflow-hidden">
            {img ? (
              <img src={img} alt="music-cart" className="object-cover" />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-[#383838]">
                <BsMusicNoteBeamed className="h-full w-[50%]" />
              </div>
            )}
          </div>
          <div className="content mt-4">
            <h4 className="text-base mb-2 capitalize text-ellipsis whitespace-nowrap overflow-hidden">
              {title}
            </h4>
            <div className="content text-sm text-ellipsis overflow-hidden whitespace-normal">
              {content}
            </div>
          </div>
        </div>
      </Link>

      {isSearch && (
        <div
          className="absolute top-3 right-3 font-bold text-lg cursor-pointer text-white"
          onClick={() => {
            dispatch(removeRecentSearches(idCheck));
          }}
        >
          <RxCross1 />
        </div>
      )}

      {/* play pause button */}

      <div
        className={`icon ${
          isPlaying && currentPlaylist?.href?.includes(idCheck)
            ? "opacity-100 top-[40%]"
            : ""
        } absolute flex justify-center items-center text-black top-[50%] opacity-0 right-6 text-base duration-500 z-[11] rounded-full`}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full hover:scale-105 transition-transform cursor-pointer bg-primary">
          {isPlaying && currentPlaylist?.href?.includes(idCheck) ? (
            <IoIosPause
              className="h-6 w-6"
              onClick={() => {
                dispatch(setPlaying(false));
              }}
            />
          ) : (
            <IoIosPlay
              className="h-6 w-6"
              onClick={() => {
                handlePlaylists();
                dispatch(setPlaying(true));
              }}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <LoadingForTrack />
  );
};

export default MusicCart;
