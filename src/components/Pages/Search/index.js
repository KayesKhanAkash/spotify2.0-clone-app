import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAverageHex } from "../../Helper/Functions";
import { Link } from "react-router-dom";
import ArtistCart from "./ArtistCart";
import MusicCart from "../Home/MusicCart";
import SpotifyWebApi from "spotify-web-api-js";
import { styles } from "../../../Utils/commonStyles";

const Search = () => {
  const { categoryPlaylists, categories } = useSelector(
    (state) => state.DataLayerSlice
  );

  const spotify = new SpotifyWebApi();

  const imgRef = useRef(null);

  const [colors, setColors] = useState([]);

  const handleRgb = (e) => {
    setColors((prev) => [...prev, getAverageHex(e.target)]);
  };

  const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));

  return (
    <div className={`search mt-28 ${styles.paddingX}`}>
      {recentSearches?.length > 0 && (
        <>
          <h2 className="mb-4">Recent Searches</h2>
          <div className={`${styles.gridContainer} mb-10`}>
            {recentSearches?.map((item, index) => {
              if (item?.type === "artist") {
                return (
                  <div key={item?.id + index}>
                    <ArtistCart
                      name={item?.name}
                      type={item?.type}
                      images={item?.img}
                      id={item?.playlistId ? item?.playlistId : null}
                      spotify={spotify}
                      isSearch={true}
                    />
                  </div>
                );
              } else if (item?.type === "album") {
                return (
                  <div key={item?.id + index}>
                    <MusicCart
                      img={item?.img}
                      title={item?.name}
                      artists={item?.artists}
                      albumId={item?.playlistId}
                      isSearch={true}
                    />
                  </div>
                );
              } else if (item?.type === "playlist") {
                return (
                  <div key={item?.id + index}>
                    <MusicCart
                      img={item?.img}
                      title={item?.name}
                      description={item?.description}
                      playlistId={item?.playlistId}
                      isSearch={true}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </>
      )}

      <h2 className="mb-4">Browse all</h2>
      <div className={`${styles.gridContainer}`}>
        {categories?.categories?.items?.map((category, index) => (
          <Link to={`/section/${category.id}`} key={category?.id + index}>
            <div
              className="category-item overflow-hidden rounded-xl px-3 pt-3 relative min-h-[200px] max-h-[200px] pb-[100%] [&_>img]:hover:rotate-[20deg] [&_>img]:hover:shadow-lg"
              style={{ background: `${colors[index]}` }}
            >
              <h2 className="w-full break-all">{category?.name}</h2>

              <img
                src={
                  categoryPlaylists
                    ? categoryPlaylists[index]?.playlists?.items[0]?.images[0]
                        ?.url
                    : null
                }
                className={`h-28 w-28 absolute bottom-0 right-0 rotate-[20deg] translate-x-6    transition-transform md:rotate-[30deg]`}
                alt="category-img"
                ref={imgRef}
                onLoad={handleRgb}
                crossOrigin=""
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
