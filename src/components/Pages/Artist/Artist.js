import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistHero from "./ArtistHero";
import PlayButton from "../Playlists/PlayButton";
import { GoKebabHorizontal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Track from "../Playlists/Track";
import Discography from "./Discography";
import {
  getArtist,
  getArtistAlbums,
  getrelatedArtists,
} from "../../../Redux/Slice/DataLayerSlice";
import ArtistCart from "../Search/ArtistCart";
import LoadingForPlaylist from "../../Loading/LoadingForPlaylist";

const Artist = () => {
  const spotify = new SpotifyWebApi();
  const { artistId } = useParams();
  const [tracks, setTracks] = useState(null);
  const [seeMore, setSeeMore] = useState(true);
  const [isFollow, setIsFollow] = useState(false);
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const { artist, artistAlbums, relatedArtists } = useSelector(
    (state) => state.DataLayerSlice
  );
  const showPerPage = seeMore ? 5 : tracks?.length;
  const dispatch = useDispatch();

  useEffect(() => {
    spotify.getArtist(artistId).then((artist) => {
      dispatch(getArtist(artist));
      spotify.getArtistTopTracks(artistId, "US").then((tracks) => {
        setTracks({ items: tracks.tracks, id: artistId });
      });
    });
    spotify.getArtistAlbums(artistId).then((albums) => {
      dispatch(getArtistAlbums(albums));
    });
    spotify.getArtistRelatedArtists(artistId).then((relatedArtist) => {
      dispatch(getrelatedArtists(relatedArtist.artists));
    });

    spotify.isFollowingArtists([artistId]).then((res) => {
      setIsFollow(res[0]);
    });

    return () => null;
  }, [artistId]);

  // follow

  const followAritst = () => {
    spotify
      .followArtists([artistId])
      .then(() => {
        setIsFollow(true);
      })
      .catch((err) => console.log(err));
  };

  //unfollow

  const unfollowArtist = () => {
    spotify
      .unfollowArtists([artistId])
      .then(() => {
        setIsFollow(false);
      })
      .catch((err) => console.log(err));
  };

  return artist ? (
    <div className="artist">
      {/* header */}
      <ArtistHero artist={artist} />

      {/* buttons */}

      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-[200px]"
          style={{
            background: `linear-gradient(rgba(0,0,0,.6) 0, #121212 100%), ${hexColorCode}`,
          }}
        ></div>
        <div className="flex gap-6 items-center z-10 relative py-6 px-6">
          <PlayButton
            className={"w-12 h-12"}
            playlist={tracks}
            playlistId={artistId}
          />
          {isFollow ? (
            <button
              type="button"
              className="border border-gray-500 border-solid px-3 py-1.5 text-sm rounded-lg text-white font-semibold uppercase hover:border-white"
              onClick={unfollowArtist}
            >
              unfollow
            </button>
          ) : (
            <button
              type="button"
              className="border border-gray-500 border-solid px-3 py-1.5 text-sm rounded-lg text-white font-semibold uppercase hover:border-white"
              onClick={followAritst}
            >
              follow
            </button>
          )}

          <GoKebabHorizontal className="w-7 h-7" />
        </div>

        {/* tracks */}

        <div className="track-container">
          <h2 className="relative font-semibold z-[10] px-6 mb-3">Popular</h2>

          <ul className="relative">
            {tracks?.items?.slice(0, showPerPage)?.map((item, index) => (
              <li key={item?.id + index}>
                <Track item={item} playlist={tracks} index={index} />
              </li>
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

        {/* discography */}
        <Discography artistAlbums={artistAlbums} title={"Discography"} />

        {/* related Artist */}

        <div className="related px-6">
          <div className="flex justify-between items-center">
            <h2 className="hover:underline">
              <Link to={"related"}>Fans Olso Like</Link>
            </h2>
            <Link to="related" className="hover:underline">
              Show all
            </Link>
          </div>
          <div className="grid gap-5 mt-10 grid-cols-2 mb-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9">
            {relatedArtists?.slice(0, 4)?.map((item) => (
              <div key={item?.id}>
                <ArtistCart {...item} spotify={spotify} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingForPlaylist />
  );
};

export default Artist;
