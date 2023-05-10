import React, { useState } from "react";
import FooterAlbum from "./FooterAlbum";
import PlayerControls from "./PlayerControls";
import VolumeControls from "./VolumeControls";
import { useDispatch, useSelector } from "react-redux";
import { SlArrowDown } from "react-icons/sl";
import { GoKebabHorizontal } from "react-icons/go";
import { AiOutlineShareAlt } from "react-icons/ai";
import { TbDevices2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { setMobilePlayerOpen } from "../../../Redux/Slice/PlayerSlice";

const Footer = () => {
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);
  const {
    isPlaying,
    currentSong,
    currentPlaylist,
    isMobilePlayerOpen,
    mobilePlayerColor,
  } = useSelector((state) => state.PlayerSlice);
  const dispatch = useDispatch();

  return (
    <div
      className={`footer ${
        isMobilePlayerOpen ? "bottom-0" : "-bottom-full"
      } bg-player_bg fixed left-0 w-full h-full z-30 transition-all duration-500 overflow-auto md:static`}
      style={{
        background: `linear-gradient(to bottom, ${mobilePlayerColor}, #121212)`,
      }}
    >
      <div className="footer-container flex flex-col h-full gap-3 justify-between p-5 w-full mx-auto min-w-[350px] max-w-[500px] md:max-w-none md:items-center md:flex md:flex-row">
        {/* footer-top */}

        <div className="footer-top md:hidden">
          <div className="flex justify-between items-center text-white pb-2 mb-2">
            <SlArrowDown
              className="text-lg font-bold"
              onClick={() => {
                dispatch(setMobilePlayerOpen(false));
              }}
            />
            <Link>{currentPlaylist?.name}</Link>
            <GoKebabHorizontal />
          </div>
        </div>
        <div className="footer-left basis-full md:basis-3/12">
          <FooterAlbum
            isPlaying={isPlaying}
            currentSong={currentSong}
            dispatch={dispatch}
          />
        </div>
        <div className="footer-middle md:basis-6/12 md:items-center">
          <PlayerControls
            volume={volume}
            isMute={isMute}
            dispatch={dispatch}
            isPlaying={isPlaying}
            currentSong={currentSong}
          />
        </div>
        <div className="footer-right basis-3/12 hidden justify-end md:flex">
          <VolumeControls
            volume={volume}
            setVolume={setVolume}
            isMute={isMute}
            setIsMute={setIsMute}
          />
        </div>
        <div className="footer-bottom pb-5 md:hidden">
          <div className="flex justify-between items-center">
            <TbDevices2 />
            <AiOutlineShareAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
