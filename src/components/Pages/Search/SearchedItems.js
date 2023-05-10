import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import Track from "../Playlists/Track";
import SearchLeftCol from "./SearchLeftCol";
import ArtistCart from "./ArtistCart";
import MusicCart from "../Home/MusicCart";
import { getRecentSearches } from "../../../Redux/Slice/DataLayerSlice";
import {
  LoadingForHeading,
  LoadingForImages,
  LoadingForTrack,
} from "../../Loading/LoadingItems";
import { styles } from "../../../Utils/commonStyles";

const SearchedItems = () => {
  const spotify = new SpotifyWebApi();

  const { searchedItems } = useSelector((state) => state.DataLayerSlice);
  const dispatch = useDispatch();

  const topArtist = searchedItems?.artists?.items[0];
  const [artistPlaylist, setArtistPlaylist] = useState(null);
  const [activeBtn, setActiveBtn] = useState("all");

  useEffect(() => {
    if (!topArtist?.id) return;

    spotify.getArtistTopTracks(topArtist?.id, "BD").then((tracks) => {
      setArtistPlaylist({ items: tracks.tracks, id: topArtist?.id });
    });
  }, [topArtist?.id]);

  const handleActiveBtn = (btn) => {
    setActiveBtn(btn === activeBtn ? btn : btn);
  };

  const searchBtns = searchedItems && ["all", ...Object.keys(searchedItems)];

  return (
    <div className={`search-items pt-20 ${styles.paddingX}`}>
      <div className="flex gap-4 mt-5 mb-8 text-sm overflow-auto">
        {searchBtns?.map((btn) => (
          <button
            type="button"
            key={btn}
            className={`${
              btn === activeBtn
                ? "bg-white text-black"
                : "text-white bg-[#232323]"
            } capitalize px-3 py-1 rounded-lg`}
            onClick={() => handleActiveBtn(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* all items */}

      {activeBtn === "all" && (
        <div className="All">
          <div className="flex gap-5 flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              {topArtist ? (
                <h2>Top Result</h2>
              ) : (
                <div className="w-[100px] mb-6">
                  <LoadingForHeading />
                </div>
              )}

              {topArtist ? (
                <SearchLeftCol
                  artistPlaylist={artistPlaylist}
                  playlistId={topArtist?.id}
                  topArtist={topArtist}
                />
              ) : (
                <div className="min-h-[300px] h-full w-full">
                  <LoadingForImages />
                </div>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              {searchedItems?.tracks ? (
                <h2>Songs</h2>
              ) : (
                <div className="w-[100px] mb-6">
                  <LoadingForHeading />
                </div>
              )}

              <div className="track mt-6">
                {searchedItems?.tracks?.items
                  ?.slice(0, 4)
                  ?.map((item, index) => (
                    <div key={item?.id + index}>
                      <Track
                        item={item}
                        index={index}
                        playlist={searchedItems}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* artists */}
          <section className="mt-16">
            {searchedItems?.artists?.items ? (
              <h2 className="mb-5">Artists</h2>
            ) : (
              <div className="w-[100px] mb-6">
                <LoadingForHeading />
              </div>
            )}

            <div className={`${styles.gridContainer}`}>
              {searchedItems?.artists?.items
                ?.slice(0, 4)
                ?.map((artist, index) => (
                  <div
                    key={artist?.id + index}
                    onClick={() => {
                      dispatch(
                        getRecentSearches({
                          type: artist?.type,
                          name: artist?.name,
                          playlistId: artist?.id,
                          img: artist?.images[2].url,
                        })
                      );
                    }}
                  >
                    {artist ? (
                      <ArtistCart {...artist} spotify={spotify} />
                    ) : (
                      <LoadingForTrack />
                    )}
                  </div>
                ))}
            </div>
          </section>

          {/* albums */}

          <section className="mt-16">
            <h2 className="mb-5">Albums</h2>
            <div className={`${styles.gridContainer}`}>
              {searchedItems?.albums?.items
                ?.slice(0, 4)
                ?.map((album, index) => (
                  <div
                    key={album?.id + index}
                    onClick={() =>
                      dispatch(
                        getRecentSearches({
                          type: album?.type,
                          name: album?.name,
                          img: album.images[2]?.url,
                          playlistId: album?.id,
                          artists: album?.artists,
                        })
                      )
                    }
                  >
                    <MusicCart
                      img={album?.images[2].url}
                      title={album?.name}
                      artists={album?.artists}
                      albumId={album?.id}
                    />
                  </div>
                ))}
            </div>
          </section>

          {/* playlists */}

          <section className="mt-16">
            <h2 className="mb-5">Playlists</h2>
            <div className={`${styles.gridContainer}`}>
              {searchedItems?.playlists?.items?.slice(0, 4)?.map((playlist) => (
                <div
                  key={playlist?.id}
                  onClick={() =>
                    dispatch(
                      getRecentSearches({
                        type: playlist?.type,
                        name: playlist?.name,
                        img: playlist?.images[0]?.url,
                        playlistId: playlist?.id,
                        description: playlist?.description,
                      })
                    )
                  }
                >
                  <MusicCart
                    img={playlist?.images[0]?.url}
                    title={playlist?.name}
                    description={playlist?.description}
                    playlistId={playlist?.id}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/*all albums */}

      {activeBtn === "albums" && (
        <section className="mt-6">
          <h2 className="mb-5">Albums</h2>
          <div className={`${styles.gridContainer}`}>
            {searchedItems?.albums?.items?.map((album) => (
              <div
                key={album?.id}
                onClick={() =>
                  dispatch(
                    getRecentSearches({
                      type: album?.type,
                      name: album?.name,
                      img: album.images[2]?.url,
                      playlistId: album?.id,
                      artists: album?.artists,
                    })
                  )
                }
              >
                <MusicCart
                  img={album?.images[2].url}
                  title={album?.name}
                  artists={album?.artists}
                  albumId={album?.id}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/*all artists */}

      {activeBtn === "artists" && (
        <section className="mt-6">
          <h2 className="mb-5">Artists</h2>
          <div className={`${styles.gridContainer}`}>
            {searchedItems?.artists?.items?.map((artist) => (
              <div
                key={artist?.id}
                onClick={() => {
                  dispatch(
                    getRecentSearches({
                      type: artist?.type,
                      name: artist?.name,
                      playlistId: artist?.id,
                      img: artist?.images[2].url,
                    })
                  );
                }}
              >
                {artist ? (
                  <ArtistCart {...artist} spotify={spotify} />
                ) : (
                  <LoadingForTrack />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* all tracks */}

      {activeBtn === "tracks" && (
        <div className="track mt-6">
          {searchedItems?.tracks?.items?.map((item, index) => (
            <div key={item?.id}>
              <Track
                item={item}
                index={index}
                playlist={searchedItems?.tracks}
              />
            </div>
          ))}
        </div>
      )}

      {/* playlists */}

      {activeBtn === "playlists" && (
        <section className="mt-6">
          <h2 className="mb-5">Playlists</h2>
          <div className={`${styles.gridContainer}`}>
            {searchedItems?.playlists?.items?.map((playlist) => (
              <div
                key={playlist?.id}
                onClick={() =>
                  dispatch(
                    getRecentSearches({
                      type: playlist?.type,
                      name: playlist?.name,
                      img: playlist?.images[0]?.url,
                      playlistId: playlist?.id,
                      description: playlist?.description,
                    })
                  )
                }
              >
                <MusicCart
                  img={playlist?.images[0]?.url}
                  title={playlist?.name}
                  description={playlist?.description}
                  playlistId={playlist?.id}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchedItems;
