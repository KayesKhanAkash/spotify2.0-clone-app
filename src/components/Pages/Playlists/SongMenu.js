import React, { useRef, useState } from "react";
import { styles } from "../../../Utils/commonStyles";
import { AiFillCaretRight, AiOutlineShareAlt } from "react-icons/ai";
import { RiAlbumLine } from "react-icons/ri";
import {
  BsFillPersonFill,
  BsMusicNoteBeamed,
  BsMusicNoteList,
} from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaylistDrop from "./PlaylistDrop";
import SpotifyWebApi from "spotify-web-api-js";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg";

const SongMenu = ({
  show,
  _show,
  set_Show,
  itemName,
  artists,
  albumId,
  externalUrls,
  uri,
  playlistId,
}) => {
  const spotify = new SpotifyWebApi();
  const { userPlayLists } = useSelector((state) => state.DataLayerSlice);
  // const { playerBodyScrollY } = useSelector((state) => state.PlayerSlice);
  const SongMenuRef = useRef(null);
  // const [className, setClassName] = useState("");
  const [isDropOpen, setIsDropOpen] = useState(false);

  const currentPlaylist = userPlayLists?.items?.find(
    (item) => item.id === playlistId
  );

  const links = [
    {
      title: "Go to Artists",
      url: `/artist/${artists[0]?.id}`,
      icon: <BsFillPersonFill />,
    },
    {
      title: "Go to Album",
      url: `/albums/${albumId}`,
      icon: <RiAlbumLine />,
    },

    !currentPlaylist
      ? {
          icon: <CgPlayListAdd />,
          title: "Add to Playlist",
          drop: true,
          dropOpen: () => setIsDropOpen(true),
          nestedDrop: () => (
            <PlaylistDrop
              userPlayLists={userPlayLists}
              uri={uri}
              spotify={spotify}
              isDropOpen={isDropOpen}
              setIsDropOpen={() => {
                setIsDropOpen(false);
              }}
            />
          ),
        }
      : {
          title: "Remove From the playlist",
          icon: <CgPlayListRemove />,
          removeFromPlaylist: () => {
            spotify
              .removeTracksFromPlaylist(playlistId, [uri])
              .then(() => alert("removed from the playlist"))
              .catch((err) => {
                console.log(err);
              });
          },
        },

    {
      title: "Share",
      drop: true,
      icon: <AiOutlineShareAlt />,
      nestedDropLinks: [
        {
          title: "Copy song link",
          copyLink: async function () {
            try {
              await navigator.clipboard.writeText(externalUrls);
              alert(`Link is copied`);
            } catch (err) {
              console.log(err);
            }
          },
        },
        {
          title: "Embed track",
        },
      ],
      nestedDrop: function () {
        return (
          <ul className={`${styles.dropContainer} top-0 left-[-103%] hidden`}>
            {this.nestedDropLinks.map((item) => (
              <li
                key={item.title}
                className={`${styles.dropLink}`}
                onClick={() => {
                  item.copyLink && item.copyLink();
                }}
              >
                {item?.title}
              </li>
            ))}
          </ul>
        );
      },
    },
  ];

  // use effect

  // useEffect(() => {
  //   const song = SongMenuRef.current;
  //   const top = song.getBoundingClientRect().top;
  //   const screenHeight = window.visualViewport.height;

  //   if (top > screenHeight / 2 + 50) {
  //     setClassName("bottom-0");
  //   } else {
  //     setClassName("top-full");
  //   }

  //   return () => null;
  // }, [playerBodyScrollY]);

  // song menu component

  return (
    <>
      <div
        className={`${show ? `visible` : "invisible"} ${
          styles.dropContainer
        } left-[-210px] transition-none hidden md:block`}
        ref={SongMenuRef}
      >
        <ul>
          <li>
            <a
              href={externalUrls}
              target="_blank"
              rel="noreferrer"
              className={`${styles.dropLink} cursor-pointer`}
            >
              Listen the full song
            </a>
          </li>
          {links.map((link, index) => (
            <li
              key={index}
              className={`${
                links.length - 1 === index ? "border-t border-[#454545]" : ""
              } relative md:[&_>ul]:hover:block`}
              onClick={() =>
                link?.removeFromPlaylist ? link.removeFromPlaylist() : null
              }
            >
              <Link to={link?.url} className={`${styles.dropLink}`}>
                <span>{link?.title}</span>

                {link?.drop && <AiFillCaretRight className="text-lg" />}
              </Link>

              {/* nested drop */}

              {link?.drop && link?.nestedDrop && link.nestedDrop()}
            </li>
          ))}
        </ul>
      </div>

      {/* for mobile */}

      <div
        className={`${_show ? `top-0 opacity-100` : "top-full opacity-0"} ${
          styles.paddingX
        } fixed left-0 w-full h-screen flex flex-col justify-between z-40 transition-all overflow-y-auto bg-[#000000e2] md:hidden`}
        ref={SongMenuRef}
      >
        <div className="flex flex-col gap-8">
          <div className="flex mt-16 gap-5 items-center">
            <div className="w-12 h-12 bg-[#3f3f3f]">
              <BsMusicNoteBeamed className="w-full h-full p-3" />
            </div>
            <div className="">
              <p className="text-white text-base mb-1">{itemName}</p>
              <p className="text-overflow text-xs mt-1">
                {artists?.map((artist, idx, arr) => (
                  <span key={artist?.id}>
                    <Link
                      to={`/artist/${artist?.id}`}
                      className="hover:underline capitalize hover:text-white"
                    >
                      {artist.name}
                      {arr.length > 1 && idx !== arr.length - 1 ? (
                        <span>, </span>
                      ) : null}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* links */}

          <ul className="flex flex-col gap-4 text-slate-200">
            <li className="flex gap-2 items-center">
              <BiHeart className="h-6 w-6" />
              <span>Like</span>
            </li>
            <li className="flex gap-2 items-center">
              <BsMusicNoteList className="h-6 w-6" />
              <a
                href={externalUrls}
                target="_blank"
                rel="noreferrer"
                className={`cursor-pointer`}
              >
                Listen the full song
              </a>
            </li>
            {links.map((link, index) => (
              <li
                key={index}
                className={`relative [&_.deskDrop]:hover:block flex gap-2 items-center [&_svg]:h-6 [&_svg]:w-6`}
              >
                {link.icon}
                <Link
                  to={link?.url}
                  className={``}
                  onClick={() => {
                    link?.removeFromPlaylist && link.removeFromPlaylist();
                    link?.dropOpen && link?.dropOpen();
                  }}
                >
                  <span>{link?.title}</span>
                </Link>

                {/* nested drop */}

                {link?.drop && link?.nestedDrop && link.nestedDrop()}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="py-2 px-3 text-white"
          onClick={() => set_Show(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default SongMenu;
