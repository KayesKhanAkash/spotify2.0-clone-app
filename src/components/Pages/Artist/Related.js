import React from "react";
import { useSelector } from "react-redux";
import ArtistCart from "../Search/ArtistCart";
import SpotifyWebApi from "spotify-web-api-js";

const Related = () => {
  const { relatedArtists } = useSelector((state) => state.DataLayerSlice);
  const spotify = new SpotifyWebApi();

  return (
    <div className="related mt-16 px-6">
      <h2>Related</h2>
      <div className="grid gap-5 mt-10 grid-cols-2 mb-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9">
        {relatedArtists?.map((item) => (
          <div>
            <ArtistCart {...item} spotify={spotify} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Related;
