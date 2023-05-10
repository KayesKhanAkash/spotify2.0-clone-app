import React from "react";
import { MdOutlineLyrics, MdOutlineDevicesOther } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute2,
} from "react-icons/im";

const VolumeControls = ({ volume, setVolume, isMute, setIsMute }) => {
  return (
    <div className="flex gap-3">
      <MdOutlineLyrics className="w-4 h-4 cursor-pointer hover:text-white" />
      <HiOutlineQueueList className="w-4 h-4 cursor-pointer hover:text-white" />
      <MdOutlineDevicesOther className="w-4 h-4 cursor-pointer hover:text-white" />
      <div className="flex gap-2 items-center">
        <div className="volume relative w-4 h-4">
          {!isMute && volume <= 1 && volume >= 0.7 && (
            <ImVolumeHigh
              className={`absolute top-0 left-0 cursor-pointer w-full h-full hover:text-white`}
              onClick={() => setIsMute(!isMute)}
            />
          )}

          {!isMute && volume >= 0.3 && volume < 0.7 && (
            <ImVolumeMedium
              className={`absolute top-0 left-0 cursor-pointer w-full h-full hover:text-white`}
              onClick={() => setIsMute(!isMute)}
            />
          )}
          {!isMute && volume > 0 && volume < 0.3 && (
            <ImVolumeLow
              className={`absolute top-0 left-0 cursor-pointer w-full h-full hover:text-white`}
              onClick={() => setIsMute(!isMute)}
            />
          )}

          {isMute || volume === "0" ? (
            <ImVolumeMute2
              className={`absolute top-0 left-0 cursor-pointer w-full h-full hover:text-white`}
              onClick={() => setIsMute(!isMute)}
            />
          ) : null}
        </div>

        <div className="slide-container min-w-[60px] h-[10px] relative">
          <div className="overflow-hidden relative w-full h-[4px] rounded-lg top-[50%] translate-y-[-50%]">
            <div
              className="slide absolute bg-white left-0 w-full h-full z-10 rounded-[99px]"
              style={{
                transform: `translateX(${-100 + volume * 100}%)`,
              }}
            ></div>
            <div className="absolute bg-[#5E5E5E] left-0 w-full h-full rounded-[99px]"></div>
          </div>

          <input
            type="range"
            step="any"
            name="volumeRange"
            id="volumeRange"
            className="volumeRange"
            value={volume}
            max="1"
            min="0"
            onChange={(e) => {
              setVolume(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeControls;
