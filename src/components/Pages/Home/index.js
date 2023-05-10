import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicCart from "./MusicCart";
import LoadingHome from "../../Loading/LoadingHome";
import SpotifyWebApi from "spotify-web-api-js";
import { getRecentAlbums } from "../../../Redux/Slice/DataLayerSlice";
import { Link } from "react-router-dom";
import { styles } from "../../../Utils/commonStyles";

const Home = () => {
  const spotify = new SpotifyWebApi();
  const {
    featuredPlaylists,
    categories,
    categoryPlaylists,
    recentlyPlayedTracks,
    recentAlbums,
  } = useSelector((state) => state.DataLayerSlice);
  const dispatch = useDispatch();

  // useStates

  const featuredItems = featuredPlaylists?.playlists?.items;

  const playlists = {};
  const len = categories?.categories?.items.length;

  for (let i = 0; i < len; i++) {
    if (categoryPlaylists) {
      playlists[categories?.categories?.items[i]?.name] = categoryPlaylists[i];
    }
  }

  const ids = recentlyPlayedTracks?.items?.map(
    (item) => item?.track?.album?.id
  );

  const uniqueIds = [...new Set(ids)];

  // use effect

  useEffect(() => {
    if (uniqueIds.length > 0) {
      spotify.getAlbums(uniqueIds).then((albums) => {
        dispatch(getRecentAlbums(albums));
      });
    }
  }, [uniqueIds.length]);

  return categoryPlaylists ? (
    <div
      className={`home [&_h2]:mb-5 [&_h2]:capitalize pt-16 ${styles.paddingX}`}
    >
      {/* recently played songs*/}

      {recentAlbums && (
        <section className={`${styles.sectionMarginTop}`}>
          <div className="flex justify-between items-center">
            <h2>Recently Played</h2>
            <Link
              to={"genre/recent-played"}
              className="text-sm font-semibold hover:underline"
            >
              Show all
            </Link>
          </div>
          <div className={styles.gridContainer}>
            {recentAlbums?.albums?.slice(0, 4).map((item) => (
              <div key={item.id}>
                <MusicCart
                  img={item.images[1].url}
                  title={item.name}
                  albumId={item.id}
                  artists={item.artists}
                  albumTracks={item.tracks}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* songs */}

      <section className={`${styles.sectionMarginTop}`}>
        <div className="flex justify-between items-center">
          <h2 className="hover:underline">
            <Link to={"genre/At Home"}>At Home</Link>
          </h2>
          <Link
            to={"genre/At Home"}
            type="button"
            className="text-sm hover:underline"
          >
            Show all
          </Link>
        </div>
        <div className={styles.gridContainer}>
          {playlists["At Home"]?.playlists?.items?.slice(0, 4).map((item) => (
            <div key={item.id}>
              <MusicCart
                img={item.images[0].url}
                title={item.name}
                playlistId={item.id}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Throwback */}

      <section className={`${styles.sectionMarginTop}`}>
        <div className="flex justify-between items-center">
          <h2 className="hover:underline">
            <Link to={"genre/Mood"}>Mood</Link>
          </h2>
          <Link
            to={"genre/Mood"}
            type="button"
            className="text-sm hover:underline"
          >
            Show all
          </Link>
        </div>
        <div className={styles.gridContainer}>
          {playlists["Mood"]?.playlists?.items?.slice(0, 4).map((item) => (
            <div key={item.id}>
              <MusicCart
                img={item.images[0].url}
                title={item.name}
                playlistId={item.id}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* mood */}

      <section className={`${styles.sectionMarginTop}`}>
        <div className="flex justify-between items-center">
          <h2 className="hover:underline">
            <Link to={"genre/Wellness"}>Wellness</Link>
          </h2>
          <Link
            to={"genre/Wellness"}
            type="button"
            className="text-sm hover:underline"
          >
            Show all
          </Link>
        </div>
        <div className={styles.gridContainer}>
          {playlists["Wellness"]?.playlists?.items?.slice(0, 4).map((item) => (
            <div key={item.id}>
              <MusicCart
                img={item.images[0].url}
                title={item.name}
                playlistId={item.id}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* try something */}

      <section className={`${styles.sectionMarginTop}`}>
        <h2>Try Something Else</h2>
        <div className={styles.gridContainer}>
          {featuredItems?.slice(0, 4).map((item) => (
            <div key={item.id}>
              <MusicCart
                img={item.images[0].url}
                title={item.name}
                playlistId={item.id}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* todays biggests hits */}

      <section className={`${styles.sectionMarginTop}`}>
        <div className="flex justify-between items-center">
          <h2 className="hover:underline">
            <Link to={"genre/Top Lists"}>Todays Biggest Hits</Link>
          </h2>
          <Link
            to={"genre/Top Lists"}
            type="button"
            className="text-sm hover:underline"
          >
            Show all
          </Link>
        </div>
        <div className={styles.gridContainer}>
          {playlists["Top Lists"]?.playlists?.items?.slice(0, 4).map((item) => (
            <div key={item.id}>
              <MusicCart
                img={item.images[0].url}
                title={item.name}
                playlistId={item.id}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  ) : (
    <LoadingHome />
  );
};

export default Home;
