import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const SettingAside = ({ show, setShow }) => {
  return (
    <div
      className={`${
        show ? "right-0 opacity-100" : "-right-full opacity-0"
      } fixed w-full top-0 h-full bg-player_bg px-6 py-4 transition-all duration-500 z-40`}
    >
      <div
        className="flex justify-end items-center text-3xl cursor-pointer"
        onClick={() => setShow(false)}
      >
        <HiXMark />
      </div>

      {/* ul link one */}

      <ul className="text-lg flex flex-col gap-3 mt-2 focus:[&_li_a]:opacity-80 focus:[&_li_a]:scale-90 [&_li_a]:transition-all">
        <li>
          <Link className="flex gap-2 items-center">
            <span>View Account</span>
            <FiExternalLink />
          </Link>
        </li>
        <li>
          <Link className="inline-block">Profile</Link>
        </li>
        <li>
          <Link className="inline-block">Log Out</Link>
        </li>
      </ul>
      <hr className="w-5 my-5 border-none h-[3px] outline-none bg-text_color" />

      {/* ul link two */}

      <ul className="text-base flex flex-col gap-2 [&_li_a]:inline-block focus:[&_li_a]:opacity-80 focus:[&_li_a]:scale-90 [&_li_a]:transition-all">
        <li>
          <Link>Premium</Link>
        </li>
        <li>
          <Link>Support</Link>
        </li>
        <li>
          <Link>Download</Link>
        </li>
        <li>
          <Link>Privacy</Link>
        </li>
        <li>
          <Link>Terms</Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingAside;
