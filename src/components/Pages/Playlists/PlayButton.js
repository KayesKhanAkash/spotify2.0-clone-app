import React from "react";
import {
  handleCurrentPlaylist,
  setPlaying,
} from "../../../Redux/Slice/PlayerSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosPause, IoIosPlay } from "react-icons/io";

const PlayButton = ({
  className,
  playlist,
  albumPlaylist,
  artistPlaylist,
  tracksPlaylist,
  playlistId,
}) => {
  const { currentInx, currentPlaylist, isPlaying } = useSelector(
    (state) => state.PlayerSlice
  );
  const dispatch = useDispatch();

  const idCheck = playlistId
    ? currentPlaylist?.href?.includes(playlistId) ||
      currentPlaylist?.id === playlistId
    : true;

  return (
    <div
      className={`${className} text-black flex justify-center items-center bg-primary rounded-full hover:scale-105 transition-transform cursor-pointer`}
    >
      {isPlaying && idCheck ? (
        <IoIosPause
          className="w-[50%] h-[50%]"
          onClick={() => {
            dispatch(setPlaying(false));
          }}
        />
      ) : (
        <IoIosPlay
          className="w-[50%] h-[50%]"
          onClick={() => {
            dispatch(
              handleCurrentPlaylist({
                currentPlaylist:
                  playlist || albumPlaylist || tracksPlaylist || artistPlaylist,
                currentSong:
                  playlist?.items[currentInx] ||
                  albumPlaylist?.items[currentInx] ||
                  artistPlaylist?.items[currentInx],
                index: currentInx,
                images: albumPlaylist?.images ? albumPlaylist?.images : null,
              })
            );
            dispatch(setPlaying(true));
          }}
        />
      )}
    </div>
  );
};

export default PlayButton;
