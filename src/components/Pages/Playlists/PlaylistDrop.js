import React, { useState } from "react";
import { styles } from "../../../Utils/commonStyles";
import { CgSearch } from "react-icons/cg";
import { HiXMark } from "react-icons/hi2";

const PlaylistDrop = ({
  userPlayLists,
  uri,
  spotify,
  isDropOpen,
  setIsDropOpen,
}) => {
  const [filterPlaylist, setFilterPlaylist] = useState(userPlayLists);

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    const searchedPlaylists = userPlayLists.items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilterPlaylist({ items: searchedPlaylists });
  };

  const addToPlaylist = (playlistId) => {
    spotify
      .addTracksToPlaylist(playlistId, [uri], { position: 0 })
      .then(() => {
        alert("added to the playlist");
        setIsDropOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* for desktop */}

      <ul
        className={`deskDrop playlistDrop ${styles.dropContainer} overflow-y-auto overflow-x-hidden max-h-[290px] min-h-[290px] bottom-0 left-[-103%] hidden`}
      >
        <li className={`${styles.dropLink} gap-2`}>
          <CgSearch className="min-w-[20px] text-lg" />
          <input
            className="bg-transparent outline-none flex-1"
            type="search"
            name="playlist-search"
            id="playlis-search"
            placeholder="Find a playlist.."
            onChange={handleSearch}
          />
        </li>
        {filterPlaylist?.items?.map((item) => (
          <li
            key={item?.id}
            className={`${styles.dropLink}`}
            onClick={() => addToPlaylist(item?.id)}
          >
            {item?.name}
          </li>
        ))}
      </ul>

      {/* for mobile device */}

      <ul
        className={`playlistDrop ${
          isDropOpen ? "top-1/2 visible md:invisible" : "-top-full invisible"
        } fixed left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[80%] overflow-y-auto overflow-x-hidden transition-all bg-[#282828] z-10 md:hidden`}
      >
        {/* <li className="flex justify-end items-center text-white bold text-lg py-2 px-2"></li> */}
        <li className={`${styles.dropLink} gap-2`}>
          <CgSearch className="min-w-[20px] text-lg" />
          <input
            className="bg-transparent outline-none flex-1"
            type="search"
            name="playlist-search"
            id="playlis-search"
            placeholder="Find a playlist.."
            onChange={handleSearch}
          />
          <HiXMark className="cursor-pointer" onClick={setIsDropOpen} />
        </li>
        {filterPlaylist?.items?.map((item) => (
          <li
            key={item?.id}
            className={`${styles.dropLink}`}
            onClick={() => addToPlaylist(item?.id)}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PlaylistDrop;
