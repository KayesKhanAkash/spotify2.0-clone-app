import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import PlayButton from "../Playlists/PlayButton";
import { FiHeart } from "react-icons/fi";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Track from "../Playlists/Track";
import TrackHero from "./TrackHero";
import {
  getArtist,
  getArtistAlbums,
} from "../../../Redux/Slice/DataLayerSlice";
import Discography from "../Artist/Discography";

const TrackItem = () => {
  const spotify = new SpotifyWebApi();
  const { trackId } = useParams();
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const { artist, artistAlbums } = useSelector((state) => state.DataLayerSlice);
  const [singleTrack, setSingleTrack] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [seeMore, setSeeMore] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const track = await spotify.getTrack(trackId);
      setSingleTrack(track);

      const artist = await spotify.getArtist(track?.artists[0]?.id);
      dispatch(getArtist(artist));

      const topTracks = await spotify.getArtistTopTracks(
        track?.artists[0]?.id,
        "US"
      );
      setTracks({ items: topTracks.tracks, id: track?.artists[0]?.id });

      const albums = await spotify.getArtistAlbums(track?.artists[0].id);
      dispatch(getArtistAlbums(albums));
    })();
  }, [trackId]);

  const showPerPage = seeMore ? 5 : tracks?.length;

  return (
    <div className="trackItem">
      <div className="trackItem-container">
        <TrackHero singleTrack={singleTrack} artist={artist} />
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-full h-[200px]"
            style={{
              background: `linear-gradient(rgba(0,0,0,.6) 0, #121212 100%), ${hexColorCode}`,
            }}
          ></div>
          {/* play pause button */}
          <div className="flex gap-6 items-center z-10 relative py-6 px-4 md:px-6">
            <PlayButton
              className={"w-12 h-12"}
              playlistId={tracks?.id}
              artistPlaylist={tracks}
            />
            <FiHeart className="w-8 h-8" />
            <GoKebabHorizontal className="w-7 h-7" />
          </div>

          <div className="track-container">
            {/* Artist */}

            <div className="mx-4 hover:bg-[#2a2a2a] relative z-[10] md:px-6">
              <Link to={`/artist/${artist?.id}`}>
                <div className="flex gap-4 items-center p-3">
                  <div className="img overflow-hidden w-[80px] h-[80px] rounded-full">
                    <img
                      src={artist?.images[2]?.url}
                      alt="artist"
                      className="object-cover"
                    />
                  </div>
                  <div className="">
                    <p className="capitalize font-semibold text-sm text-[#dcdcdc]">
                      {artist?.type}
                    </p>
                    <h4 className="name mt-1.5 capitalize hover:underline text-base font-bold text-white">
                      {artist?.name}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* artists top tracks */}
            <div className="px-4 my-8 md:px-6">
              <p className="text-sm mb-2">Popular Tracks by</p>
              <h3 className="text-lg capitalize">{artist?.name}</h3>
            </div>

            <ul className="px-4 md:px-6">
              {tracks?.items?.slice(0, showPerPage).map((track, index) => (
                <div key={track?.id}>
                  <Track item={track} playlist={tracks} index={index} />
                </div>
              ))}
            </ul>

            {tracks?.items?.length > 5 ? (
              <button
                type="button"
                className="font-semibold mt-3 mx-6 hover:text-white text-sm"
                onClick={() => {
                  setSeeMore(!seeMore);
                }}
              >
                {seeMore ? "See more" : "See less"}
              </button>
            ) : null}
          </div>

          <Discography
            artistAlbums={artistAlbums}
            title={`More by ${artist?.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
