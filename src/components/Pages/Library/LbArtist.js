import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistCart from "../Search/ArtistCart";
import { styles } from "../../../Utils/commonStyles";

const LbArtist = () => {
  const spotify = new SpotifyWebApi();

  // states

  const [followedArtists, setFollowedArtists] = useState(null);

  useEffect(() => {
    spotify
      .getFollowedArtists()
      .then((artists) => {
        setFollowedArtists(artists?.artists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return followedArtists?.items.length > 0 ? (
    <div className="followedArtists py-6">
      <h2>Your Followed Artists</h2>
      <div className={`${styles.gridContainer} mt-6`}>
        {followedArtists?.items?.map((item) => (
          <div key={item?.id}>
            <ArtistCart {...item} spotify={spotify} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1>You haven't follow any artists</h1>
    </div>
  );
};

export default LbArtist;
