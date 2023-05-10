import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlayButton from "../Playlists/PlayButton";
import { RxCross1 } from "react-icons/rx";
import { removeRecentSearches } from "../../../Redux/Slice/DataLayerSlice";
import { useDispatch, useSelector } from "react-redux";

const ArtistCart = ({ name, id, images, type, spotify, isSearch }) => {
  const [artistPlaylist, setArtistPlaylist] = useState(null);
  const dispatch = useDispatch();
  const { currentPlaylist, isPlaying } = useSelector(
    (state) => state.PlayerSlice
  );

  useEffect(() => {
    spotify?.getArtistTopTracks(id, "BD").then((tracks) => {
      setArtistPlaylist({ items: tracks.tracks, id: id, name: name });
    });
  }, []);

  return (
    <div className="artist-cart relative [&_.icon]:hover:opacity-100 [&_.icon]:hover:top-[40%] rounded-lg overflow-hidden hover:-translate-y-2 transition-transform">
      <Link to={`/artist/${id}`}>
        <div className="bg-[#181818] flex flex-col justify-evenly p-4 min-h-[260px] max-h-[260px] transition-colors hover:bg-[#2e2e2e]">
          <div className="img rounded-full w-[100px] h-[100px] mx-auto overflow-hidden md:w-[120px] md:h-[120px]">
            <img
              src={images[2]?.url || images}
              alt="artist"
              className="object-cover"
            />
          </div>
          <div className="content mt-4">
            <h4 className="text-base mb-2 capitalize text-ellipsis whitespace-nowrap overflow-hidden">
              {name}
            </h4>
            <p className="text-sm capitalize">{type}</p>
          </div>
        </div>
      </Link>

      {isSearch && (
        <div
          className="absolute top-3 right-3 font-bold text-lg cursor-pointer text-white"
          onClick={() => {
            dispatch(removeRecentSearches(id));
          }}
        >
          <RxCross1 />
        </div>
      )}

      {/* play button */}
      <div
        className={`icon ${
          isPlaying && currentPlaylist?.id === id ? "opacity-100 top-[40%]" : ""
        } absolute flex justify-center items-center text-black top-[50%] opacity-0 right-3 text-base duration-500 z-[11] rounded-full`}
      >
        <PlayButton
          className={"h-10 w-10"}
          artistPlaylist={artistPlaylist}
          playlistId={id}
        />
      </div>
    </div>
  );
};

export default ArtistCart;
