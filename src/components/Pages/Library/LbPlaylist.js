import React from "react";
import { useSelector } from "react-redux";
import MusicCart from "../Home/MusicCart";
import { Link } from "react-router-dom";
import { styles } from "../../../Utils/commonStyles";

const LbPlaylist = () => {
  const { userPlayLists } = useSelector((state) => state.DataLayerSlice);

  return (
    <div className="lb-playlist">
      <h2 className="mb-8">Playlists</h2>

      {/* playlist Left col */}

      <div className={`${styles.gridContainer}`}>
        <Link
          className="col-span-2 flex flex-col justify-end p-4 rounded-lg text-white min-h-[260px] max-h-[260px]"
          style={{ background: `linear-gradient(135deg, #480FF5, #8D8CE5)` }}
        >
          <h1 className="mb-3">Liked Songs</h1>
          <p>0 Liked songs</p>
        </Link>
        {userPlayLists?.items?.map((item) => (
          <div key={item?.id}>
            <MusicCart
              img={item?.images[0]?.url}
              title={item?.name}
              description={`made by ${item?.owner?.display_name}`}
              playlistId={item?.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LbPlaylist;
