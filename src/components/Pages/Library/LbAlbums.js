import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import MusicCart from "../Home/MusicCart";
import { styles } from "../../../Utils/commonStyles";

const LbAlbums = () => {
  const spotify = new SpotifyWebApi();

  // states

  const [followedAlbums, setfollowedAlbums] = useState(null);

  useEffect(() => {
    // spotify
    //   .()
    //   .then((artists) => {
    //     setfollowedAlbums(artists?.artists);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return followedAlbums?.items.length > 0 ? (
    <div className="followedAlbums pt-6">
      <h2>Your Followed Artists</h2>
      <div className={`${styles.gridContainer} mt-6`}>
        {followedAlbums?.items?.map((item) => (
          <MusicCart />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1>You haven't follow any artists</h1>
    </div>
  );
};

export default LbAlbums;
