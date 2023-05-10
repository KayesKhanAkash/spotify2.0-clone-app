import React from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const Links = [
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
  {
    title: "Get App",
    url: "",
    icon: <BsSpotify />,
  },
];

const MobileNav = () => {
  return (
    <div className="mobile-nav fixed bottom-0 left-0 w-full bg-player_bg z-20 md:hidden">
      <nav className="px-6 py-3">
        <ul className="flex justify-between">
          {Links?.map((link, index) => (
            <li className="" key={index}>
              <NavLink to={link.url} className="flex flex-col items-center">
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm mt-1">{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
