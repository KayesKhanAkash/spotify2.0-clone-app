import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import {
  getSearchQuery,
  getSearchedItems,
} from "../../../Redux/Slice/DataLayerSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancel = false;

    if (search) {
      spotify
        .search(search, ["album", "artist", "playlist", "track"])
        .then((res) => {
          if (cancel) return;
          dispatch(getSearchedItems(res));
          console.log(cancel);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    dispatch(getSearchQuery(search));
    navigate(`search/${search}`);

    return () => (cancel = true);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      spotify
        .search(search, ["album", "artist", "playlist", "track"])
        .then((res) => {
          dispatch(getSearchedItems(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    dispatch(getSearchQuery(search));
    navigate(`search/${search}`);
  };

  return (
    <div className="search-bar ml-0 md:ml-5 my-2">
      <form action="" onSubmit={handleSearch}>
        <div className="flex bg-white rounded-full overflow-hidden items-center px-3">
          <FiSearch className="text-2xl min-w-[25px] text-[#252525]" />
          <input
            type="search"
            name="search"
            id="search"
            value={search}
            placeholder="What do you want to listen to?"
            className="outline-none border-none py-2.5 px-4 w-full text-[#191919] placeholder:text-[#252525] text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
