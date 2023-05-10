import React from "react";
import PlayButton from "../Playlists/PlayButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecentSearches } from "../../../Redux/Slice/DataLayerSlice";

const SearchLeftCol = ({ topArtist, playlistId, artistPlaylist }) => {
  const dispatch = useDispatch();
  const { currentPlaylist, isPlaying } = useSelector(
    (state) => state.PlayerSlice
  );

  return (
    <div className="artist relative mt-6 rounded-lg bg-[#181818] p-4 hover:bg-[#2e2e2e] overflow-hidden [&_.button]:hover:opacity-100 [&_.button]:hover:translate-y-0 [&_.button]:hover:visible">
      <Link
        to={`/artist/${playlistId}`}
        onClick={() =>
          dispatch(
            getRecentSearches({
              type: topArtist?.type,
              img: topArtist?.images[2]?.url,
              name: topArtist?.name,
              playlist: artistPlaylist,
              playlistId,
            })
          )
        }
      >
        <div className="rounded-full overflow-hidden w-[100px] h-[100px]">
          <img
            src={topArtist?.images[2]?.url}
            alt="artist"
            className="object-cover"
          />
        </div>
        <h2 className="mt-5">{topArtist?.name}</h2>
        <p className="capitalize p-1 px-2 text-sm bg-[#282828] w-fit rounded-[99px] mt-5 font-bold">
          {topArtist?.type}
        </p>
      </Link>

      <div
        className={`${
          isPlaying && currentPlaylist?.id === playlistId
            ? "opacity-100 translate-y-0 visible"
            : "invisible opacity-0 translate-y-4"
        } button absolute bottom-5 right-5 transition-all`}
      >
        <PlayButton
          className={"h-[50px] w-[50px]"}
          artistPlaylist={artistPlaylist}
          playlistId={playlistId}
        />
      </div>
    </div>
  );
};

export default SearchLeftCol;
