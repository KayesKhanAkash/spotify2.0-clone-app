import React, { useEffect, useRef, useState } from "react";
import { BiSkipNext, BiSkipPrevious, BiShuffle } from "react-icons/bi";
import { MdPauseCircle, MdPlayCircleFilled } from "react-icons/md";
import { BsFillPlayFill, BsPauseFill, BsSuitHeart } from "react-icons/bs";
import { BsRepeat } from "react-icons/bs";
import Range from "../../Pages/Player/Range";
import {
  nextSong,
  prevSong,
  setMobilePlayerOpen,
  setPlaying,
  setMobilePlayerColor,
} from "../../../Redux/Slice/PlayerSlice";
import { useSelector } from "react-redux";
import { msToMin } from "../../Helper/Functions";
import { getAverageHex } from "../../Helper/Functions";

const PlayerControls = ({
  volume,
  isMute,
  isPlaying,
  currentSong,
  dispatch,
}) => {
  // states
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [updateTime, setUpdateTime] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const songRef = useRef(null);
  const imgRef = useRef(null);

  const { currentPlaylist, currentInx, isMobilePlayerOpen, mobilePlayerColor } =
    useSelector((state) => state.PlayerSlice);

  // use values from redux

  if (songRef.current) {
    if (isPlaying) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }

  // handle next song funtions

  const handleNextSong = () => {
    dispatch(setPlaying(true));

    if (!shuffle) {
      if (currentPlaylist?.items[currentInx + 1]?.track?.preview_url) {
        dispatch(nextSong((currentInx + 1) % currentPlaylist?.items?.length));
      } else if (currentPlaylist?.items[currentInx + 1]?.preview_url) {
        dispatch(nextSong((currentInx + 1) % currentPlaylist?.items?.length));
      } else {
        dispatch(nextSong((currentInx + 2) % currentPlaylist?.items?.length));
      }
    } else {
      dispatch(
        nextSong(Math.floor(Math.random() * currentPlaylist?.items?.length))
      );
    }
  };

  // handle the prev song function

  const hanldePrevSong = () => {
    dispatch(setPlaying(true));

    if (currentInx === 0) {
      dispatch(prevSong(currentPlaylist?.items?.length - 1));
    } else if (shuffle) {
      dispatch(
        prevSong(Math.floor(Math.random() * currentPlaylist?.items?.length))
      );
    } else {
      if (currentPlaylist?.items[currentInx - 1]?.track?.preview_url) {
        dispatch(nextSong((currentInx - 1) % currentPlaylist?.items?.length));
      } else if (currentPlaylist?.items[currentInx - 1]?.preview_url) {
        dispatch(nextSong((currentInx - 1) % currentPlaylist?.items?.length));
      } else {
        dispatch(nextSong((currentInx - 2) % currentPlaylist?.items?.length));
      }
    }
  };

  // for the seektime

  useEffect(() => {
    const song = songRef.current;
    song.currentTime = seekTime;

    return () => {};
  }, [seekTime]);

  // volume

  useEffect(() => {
    songRef.current.volume = volume;
    return () => {};
  }, [volume]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        dispatch(setMobilePlayerColor(getAverageHex(imgRef.current)));
      };
    }

    return () => null;
  }, [currentSong?.name]);

  const image = currentPlaylist?.images
    ? currentPlaylist?.images[0]?.url
    : currentSong?.album?.images[1]?.url;

  const parcent = () => {
    return updateTime / (duration / 100);
  };

  return (
    <>
      {/* mobile controls */}

      {currentSong && (
        <div
          className={`mobile-controls ${
            isMobilePlayerOpen
              ? "bottom-full opacity-0"
              : "bottom-[72px] opacity-100"
          } fixed block left-0 w-full p-2 transition-all duration-500 md:hidden`}
          style={{
            background: `linear-gradient(to bottom, ${mobilePlayerColor}, #121212)`,
          }}
        >
          <div className="flex gap-4 items-center justify-between">
            <div
              className="flex items-center gap-3 w-[80%] max-w-[240px]"
              onClick={() => {
                dispatch(setMobilePlayerOpen(true));
              }}
            >
              <div className="img h-12 min-w-[51px] rounded overflow-hidden">
                <img src={image} alt="song" ref={imgRef} crossOrigin="" />
              </div>
              <div className="content text-white text-sm overflow-hidden">
                <p className="whitespace-nowrap font-semibold">
                  {currentSong?.name}
                </p>
                <p className="whitespace-nowrap">
                  {currentSong?.artists?.map((item) => item.name).join(", ")}
                </p>
              </div>
            </div>
            {/* buttons */}
            <div className="w-[20%] flex gap-4 items-center text-white">
              <div className="text-2xl font-bold">
                <BsSuitHeart className="cursor-pointer" />
              </div>
              <div className="playPause text-3xl min-w-[32px] min-h-[32px]">
                {!isPlaying ? (
                  <BsFillPlayFill
                    className="w-full h-full cursor-pointer"
                    onClick={() => {
                      dispatch(setPlaying(true));
                    }}
                  />
                ) : (
                  <BsPauseFill
                    className="w-full cursor-pointer h-full"
                    onClick={() => {
                      dispatch(setPlaying(false));
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* slide */}

          <div className="w-full min-w-[270px] h-[10px] relative md:w-auto">
            <div className="overflow-hidden relative w-full h-[4px] rounded-lg top-[50%] translate-y-[-50%]">
              <div
                className="absolute bg-white left-0 w-full h-full z-10 rounded-[99px]"
                style={{
                  transform: `translateX(${-100 + parcent()}%)`,
                }}
              ></div>
              <div className="absolute bg-[#5E5E5E] left-0 w-full h-full rounded-[99px]"></div>
            </div>
            <input
              type="range"
              name="songTime"
              id="playerRange"
              step="any"
              max={duration}
              value={updateTime}
              className="playerRange"
              readOnly
            />
          </div>
        </div>
      )}
      {/* desktop controls */}

      <div className="controls">
        <div className="flex flex-col-reverse gap-3 justify-center md:flex-col">
          <div className="flex items-center gap-3 justify-between max-w-[250px] mx-auto">
            <BiShuffle
              className={`${
                shuffle ? "text-primary" : "text-text_color"
              } h-5 w-5 hover:text-white cursor-pointer`}
              onClick={() => setShuffle(!shuffle)}
            />
            <BiSkipPrevious
              className="h-14 w-14 md:h-9 md:w-9 text-text_color hover:text-white cursor-pointer"
              onClick={hanldePrevSong}
            />
            {/* play pouse */}
            <div className="play-pause relative h-14 w-14 md:h-9 md:w-9 hover:scale-105">
              <MdPlayCircleFilled
                className={`${
                  isPlaying ? "hidden" : "block"
                } playIcon text-white absolute top-0 left-0 w-full h-full cursor-pointer`}
                onClick={() => {
                  dispatch(setPlaying(true));
                }}
              />
              <MdPauseCircle
                className={`${
                  isPlaying ? "block" : "hidden"
                } pauseIcon text-white absolute top-0 left-0 w-full h-full cursor-pointer`}
                onClick={() => {
                  dispatch(setPlaying(false));
                }}
              />
            </div>
            {/* next */}
            <BiSkipNext
              className="h-14 w-14 md:h-9 md:w-9 text-text_color hover:text-white cursor-pointer"
              onClick={handleNextSong}
            />
            <BsRepeat
              className={`${
                repeat ? "text-primary" : "text-text_color"
              } h-5 w-5 hover:text-white cursor-pointer`}
              onClick={() => setRepeat(!repeat)}
            />
          </div>
          <div className="flex justify-center flex-col items-center gap-2 mt-4 md:flex-row">
            <span className="text-xs hidden md:block">
              {msToMin(updateTime * 1000)}
            </span>
            <Range
              duration={duration}
              updateTime={updateTime}
              onInput={(e) => setSeekTime(e.target.value)}
              setSeekTime={setSeekTime}
              setUpdateTime={setUpdateTime}
              seekTime={seekTime}
            />
            <div className="flex justify-between w-full md:hidden">
              <span className="text-xs">{msToMin(updateTime * 1000)}</span>
              <span className="text-xs">{msToMin(duration * 1000)}</span>
            </div>
            <span className="text-xs hidden md:block">
              {msToMin(duration * 1000)}
            </span>
          </div>
        </div>

        <audio
          src={currentSong?.preview_url}
          controls
          className="audio"
          ref={songRef}
          loop={repeat}
          muted={isMute}
          onLoadedData={(e) => setDuration(e.target.duration)}
          onTimeUpdate={(e) => setUpdateTime(e.target.currentTime)}
          onEnded={handleNextSong}
        >
          <source src={currentSong?.preview_url} type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
};

export default PlayerControls;
