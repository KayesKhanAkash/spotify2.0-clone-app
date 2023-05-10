import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "../../spotify/spotify";
import Login from "../Pages/loginSignUp/Login";
import Player from "../Pages/Player";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  setToken,
  setUserPlayList,
  getRecenlyPlayedTracks,
  getFeaturedPlaylists,
  getSearchPlaylists,
  getCategories,
  getCategoryPlaylists,
} from "../../Redux/Slice/DataLayerSlice";
import { getAccessToken } from "./getAccesToken";
import { redirectToAuthCodeFlow } from "./redirectAuthCodeFlow";

const spotify = new SpotifyWebApi();

const AppContainer = () => {
  const { token } = useSelector((state) => state.DataLayerSlice);
  const dispatch = useDispatch();
  // const [_token, set_Token] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      window.localStorage.setItem("token", _token);
      dispatch(setToken(_token));
      spotify.setAccessToken(_token);

      spotify
        .getMe()
        .then((user) => {
          dispatch(getUser(user));
        })
        .catch((err) => {
          console.log(err.responseText);
        });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch(setUserPlayList(playlists));
      });

      spotify.getMyRecentlyPlayedTracks().then((tracks) => {
        dispatch(getRecenlyPlayedTracks(tracks));
      });

      spotify.getFeaturedPlaylists().then((playlists) => {
        dispatch(getFeaturedPlaylists(playlists));
      });

      spotify.searchPlaylists().then((artists) => {
        dispatch(getSearchPlaylists(artists));
      });

      spotify.getCategories().then((categories) => {
        dispatch(getCategories(categories));

        let playListsArr = [];

        categories?.categories?.items?.forEach((item) => {
          spotify.getCategoryPlaylists(item.id).then((playlists) => {
            playListsArr = [...playListsArr, playlists];

            dispatch(getCategoryPlaylists(playListsArr));
          });
        });
      });
    }
  }, []);

  return <div className="app-container">{token ? <Player /> : <Login />}</div>;
};

export default AppContainer;
