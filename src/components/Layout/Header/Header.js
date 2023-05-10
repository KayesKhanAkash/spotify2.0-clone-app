import React, { useRef, useState } from "react";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiFillCaretDown,
  AiOutlineSetting,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { ProfileDrop } from "./DropDown";
import { clickToClose } from "../../Helper/Functions";
import { useSelector } from "react-redux";
import PlayButton from "../../Pages/Playlists/PlayButton";
import SearchBar from "./SearchBar";
import SettingAside from "./SettingAside";
import { styles } from "../../../Utils/commonStyles";

const Header = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);
  const { isScroll } = useSelector((state) => state.PlayerSlice);
  const { user } = useSelector((state) => state.DataLayerSlice);
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);

  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className={`header sticky top-0 left-0 w-full z-30`}>
      <div
        className={`header-container flex items-center justify-between py-1 absolute left-0 top-0 w-full ${styles.paddingX}`}
        style={{
          background: `${
            isScroll
              ? `linear-gradient(rgba(0,0,0,.6) 0, #121212 100%), ${hexColorCode}`
              : `transparent`
          } `,
        }}
      >
        {/* header left */}

        <div className="header-left flex-[0.1] max-w-[100px] md:block">
          <div className="flex gap-4 items-center">
            <button
              type="button"
              className={`${
                isHome ? "hidden mr-2 md:mr-0 md:block" : "block"
              } rounded-full text-white text-2xl p-1 md:bg-black`}
              onClick={() => {
                window.history.back();
              }}
            >
              <AiOutlineLeft className="hidden md:block" />
              <AiOutlineArrowLeft className="md:hidden" />
            </button>
            <button
              type="button"
              className={`${
                window.history.state || window.history.state?.idx > 0
                  ? " text-white"
                  : "cursor-not-allowed pointer-events-none text-text_color"
              } rounded-full text-2xl bg-black text-text_color p-1 hidden lg:block`}
              onClick={() => {
                window.history.forward();
              }}
            >
              <AiOutlineRight />
            </button>
          </div>
        </div>

        {/* headerMiddle */}
        <div className="headerMiddle flex-[0.8] md:flex-[0.5]">
          {!location.pathname.includes("collection") ? (
            <div
              className={`${isScroll ? "opacity-100" : "opacity-0"} ${
                location.pathname.includes("search") ? "hidden" : ""
              } invisible ml-4 transition-opacity duration-500 md:visible`}
            >
              <PlayButton className={"h-12 w-12 my-2"} />
            </div>
          ) : (
            <div className="flex gap-4 ml-0 [&_.active]:bg-[#313131] md:ml-8">
              <NavLink
                className={
                  "rounded-lg px-4 py-2 my-2 text-sm font-bold text-white"
                }
                to={"collection/playlists"}
              >
                Playlists
              </NavLink>
              <NavLink
                className={
                  "rounded-lg px-4 py-2 my-2 text-sm font-bold text-white"
                }
                to={"collection/artists"}
              >
                Artists
              </NavLink>
              <NavLink
                className={
                  "rounded-lg px-4 py-2 my-2 text-sm font-bold text-white"
                }
                to={"collection/albums"}
              >
                Albums
              </NavLink>
            </div>
          )}

          {/* searchbar */}
          {location.pathname.includes("search") && <SearchBar />}
        </div>

        {/* header right */}

        <div className="header-right flex-[0.2] md:flex-[0.4]">
          <div className="flex gap-4 items-center justify-end text-white text-sm">
            <a
              className="text-sm font-semibold text-white py-1 px-4 bg-transparent hidden border border-solid border-gray-400 rounded-3xl hover:scale-105 transition-transform hover:border-white lg:block"
              rel="noreferrer"
              target="_blank"
              href="https://www.spotify.com/bd-en/premium/?utm_source=app&utm_medium=desktop&utm_campaign=upgrade&ref=web_loggedin_upgrade_button"
            >
              Upgrade
            </a>

            <a
              rel="noreferrer"
              href="https://www.spotify.com/bd-en/download/windows/"
              target="_blank"
              className="text-sm font-semibold text-white hidden items-center gap-1 py-1 px-4 bg-transparent border border-solid border-gray-400 rounded-3xl hover:scale-105 transition-transform hover:border-white md:flex lg:hidden"
            >
              <MdOutlineDownloadForOffline className="text-lg" />
              Install App
            </a>

            <div
              className="profile relative hidden md:block"
              ref={profileRef}
              title={user?.display_name}
            >
              <button
                type="button"
                className="profile-btn flex gap-2 items-center bg-black font-semibold rounded-3xl p-[2px] hover:bg-[#2f2f2f]"
                onClick={() =>
                  clickToClose(
                    show,
                    setShow,
                    profileRef,
                    ".profile",
                    ".profile-btn"
                  )
                }
              >
                <span className="h-7 w-7 rounded-full bg-[#535353] flex justify-center items-center text-lg">
                  <IoPersonOutline className="text-white" />
                </span>
                <span className="hidden lg:block">{user?.display_name}</span>
                <AiFillCaretDown
                  className={`${
                    show ? "rotate-180" : "rotate-0"
                  } hidden mr-1 transition-transform lg:block`}
                />
              </button>
              <ProfileDrop show={show} />
            </div>
            {/* setting for mobile */}
            <div className="setting text-2xl flex items-center md:hidden">
              <button type="button" onClick={() => setOpen(true)}>
                <AiOutlineSetting />
              </button>
              <SettingAside show={open} setShow={setOpen} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
