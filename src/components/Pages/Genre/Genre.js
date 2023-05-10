import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MusicCart from "../Home/MusicCart";
import { styles } from "../../../Utils/commonStyles";

const Genre = () => {
  const { genreId } = useParams();
  const { categories, categoryPlaylists, recentAlbums } = useSelector(
    (state) => state.DataLayerSlice
  );

  const playlists = {};
  const len = categories?.categories?.items.length;

  for (let i = 0; i < len; i++) {
    if (categoryPlaylists) {
      playlists[categories?.categories?.items[i]?.name] = categoryPlaylists[i];
    }
  }

  playlists["recent-played"] = {
    playlists: {
      items: recentAlbums.albums,
    },
  };

  return (
    <div className="genre px-4 md:px-6">
      <h2 className="mt-20 capitalize">{genreId}</h2>
      <div className={`${styles.gridContainer} mt-7`}>
        {genreId === "recent-played"
          ? recentAlbums?.albums?.map((item) => (
              <div key={item.id}>
                <MusicCart
                  img={item.images[1].url}
                  title={item.name}
                  albumId={item.id}
                  artists={item.artists}
                  albumTracks={item.tracks}
                />
              </div>
            ))
          : playlists[genreId]?.playlists?.items?.map((item, index) => (
              <div key={item.uri + index}>
                <MusicCart
                  img={item.images[0].url}
                  title={item.name}
                  playlistId={item.id}
                  description={item.description}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Genre;
