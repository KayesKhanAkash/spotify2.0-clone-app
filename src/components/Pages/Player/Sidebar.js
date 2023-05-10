import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogoWhite } from "../../../Assets/Logo";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";

const sidebarLinks = [
  {
    title: "Home",
    url: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Search",
    url: "search",
    icon: <AiOutlineSearch />,
  },
  {
    title: "Your Library",
    url: "collection/playlists",
    icon: <VscLibrary />,
  },
];

const Sidebar = () => {
  const { userPlayLists, user } = useSelector((state) => state.DataLayerSlice);
  const [updatePlaylists, setUpdatePlaylists] = useState([]);
  const spotify = new SpotifyWebApi();

  const navigate = useNavigate();

  useEffect(() => {
    setUpdatePlaylists(userPlayLists?.items);
  }, [userPlayLists?.items?.length]);

  const createPlaylist = () => {
    const userId = user?.id;

    spotify
      .createPlaylist(userId, {
        name: `my playlist#${updatePlaylists?.length + 1}`,
      })
      .then((res) => {
        if (res) {
          navigate(`/playlists/${res.id}`);
          setUpdatePlaylists((prev) => [res, ...prev]);
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sidebar min-w-[230px] max-w-[450px] w-2/12 bg-sidebar_bg text-white px-5 h-[120vh] overflow-hidden sticky top-0 left-0 hidden md:block">
      <Link className="logo" to={"/"}>
        <LogoWhite className={`h-24 w-36`} />
      </Link>
      <ul className="links">
        {sidebarLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.url}
              className={
                "flex gap-3 text-text_color py-2 text-sm items-center w-fit"
              }
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="hover:text-white transition-colors font-semibold">
                {link.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* extra links */}

      <ul className="mt-8">
        <li>
          <Link
            className={
              "flex gap-3 text-text_color py-2 text-sm items-center w-fit hover:text-white transition-colors hover:bg-transparent [&_.icon]:hover:bg-white"
            }
            onClick={createPlaylist}
          >
            <span className="icon text-2xl bg-[#B3B3B3] rounded-sm text-black">
              <IoIosAdd />
            </span>
            <span className="font-semibold">Create Playlist</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "flex gap-3 text-text_color py-2 text-sm items-center w-fit hover:text-white transition-colors hover:bg-transparent [&_.icon]:hover:opacity-100"
            }
          >
            <span
              className="icon text-sm h-6 w-6 flex items-center justify-center rounded-sm opacity-80"
              style={{ background: "linear-gradient(135deg,#450af5,#c4efd9)" }}
            >
              <BsFillSuitHeartFill className="text-white" />
            </span>
            <span className="transition-colors font-semibold">Liked Songs</span>
          </Link>
        </li>
      </ul>

      <hr />

      <ul className="playlists overflow-y-auto max-h-[150px]">
        {updatePlaylists?.map((item, index) => (
          <li key={index}>
            <Link
              to={`/playlists/${item.id}`}
              className="text-sm py-2 block capitalize text-text_color hover:text-white transition-colors font-semibold"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
