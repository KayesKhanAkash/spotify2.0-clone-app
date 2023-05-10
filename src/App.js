import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SignUp from "./components/Pages/loginSignUp/SignUp";
import AppContainer from "./components/AppContainer";
import Home from "./components/Pages/Home";
import PlayLists from "./components/Pages/Playlists";
import Albums from "./components/Pages/Albums/Albums";
import Search from "./components/Pages/Search";
import Category from "./components/Category/Category";
import SearchedItems from "./components/Pages/Search/SearchedItems";
import Artist from "./components/Pages/Artist/Artist";
import DiscographySection from "./components/Pages/Artist/DiscographySection";
import Related from "./components/Pages/Artist/Related";
import Genre from "./components/Pages/Genre/Genre";
import TrackItem from "./components/Pages/TrackItem.js/TrackItem";
import Library from "./components/Pages/Library/Library";
import LbPlaylist from "./components/Pages/Library/LbPlaylist";
import LbArtist from "./components/Pages/Library/LbArtist";
import LbAlbums from "./components/Pages/Library/LbAlbums";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Home />} />
          <Route path="playlists/:playlistsId" element={<PlayLists />} />
          <Route path="albums/:albumId" element={<Albums />} />
          <Route path="section/:categoryId" element={<Category />} />
          <Route path="artist/:artistId" element={<Artist />} />
          <Route path="track/:trackId" element={<TrackItem />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:query" element={<SearchedItems />} />
          <Route
            path="artist/:artistId/discography/:category"
            element={<DiscographySection />}
          />
          <Route
            path="track/:trackId/discography/:category"
            element={<DiscographySection />}
          />
          <Route path="artist/:artistId/related" element={<Related />} />
          <Route path="genre/:genreId" element={<Genre />} />
          {/* collection */}

          <Route path="collection" element={<Library />}>
            <Route index path="playlists" element={<LbPlaylist />} />
            <Route path="artists" element={<LbArtist />} />
            <Route path="albums" element={<LbAlbums />} />
          </Route>
        </Route>
        <Route path="signUp" element={<SignUp />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
