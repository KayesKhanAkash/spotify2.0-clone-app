import { createSlice } from "@reduxjs/toolkit";

const DataLayerSlice = createSlice({
  name: "dataLayer",
  initialState: {
    user: null,
    token: null,
    userPlayLists: null,
    recentlyPlayedTracks: null,
    recentAlbums: null,
    singleAlbum: null,
    featuredPlaylists: null,
    searchPlaylists: null,
    categories: null,
    categoryPlaylists: null,
    singlePlaylist: null,
    searchedItems: null,
    searchQuery: "",
    isLoading: false,
    artist: null,
    artistAlbums: null,
    relatedArtists: null,
    recentSearches: [],
    savedTracksIds: [],
  },
  reducers: {
    getUser: (state, { payload }) => {
      state.user = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
      window.localStorage.setItem("token", payload);
    },
    setUserPlayList: (state, { payload }) => {
      state.userPlayLists = payload;
    },
    getRecenlyPlayedTracks: (state, { payload }) => {
      state.recentlyPlayedTracks = payload;
    },
    getRecentAlbums: (state, { payload }) => {
      state.recentAlbums = payload;
    },
    getSingleAlbum: (state, { payload }) => {
      state.singleAlbum = payload;
    },
    getFeaturedPlaylists: (state, { payload }) => {
      state.featuredPlaylists = payload;
    },
    getSearchPlaylists: (state, { payload }) => {
      state.searchPlaylists = payload;
    },
    getCategories: (state, { payload }) => {
      state.categories = payload;
    },
    getCategoryPlaylists: (state, { payload }) => {
      state.categoryPlaylists = payload;
    },
    getSinglePlayLists: (state, { payload }) => {
      state.singlePlaylist = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    getSearchedItems: (state, { payload }) => {
      state.searchedItems = payload;
    },
    getSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
    getArtist: (state, { payload }) => {
      state.artist = payload;
    },
    getArtistAlbums: (state, { payload }) => {
      state.artistAlbums = payload;
    },
    getrelatedArtists: (state, { payload }) => {
      state.relatedArtists = payload;
    },
    getRecentSearches: (state, { payload }) => {
      state.recentSearches = [...state.recentSearches, payload];
      const arrayUniqueByKey = [
        ...new Map(
          state.recentSearches.map((item) => [item["playlistId"], item])
        ).values(),
      ];

      window.localStorage.setItem(
        "recentSearches",
        JSON.stringify(arrayUniqueByKey)
      );
    },
    removeRecentSearches: (state, { payload }) => {
      state.recentSearches = JSON.parse(
        localStorage.getItem("recentSearches")
      ).filter((item) => item?.playlistId !== payload);

      window.localStorage.setItem(
        "recentSearches",
        JSON.stringify(state.recentSearches)
      );
    },

    getSavedTracksIds: (state, { payload }) => {
      state.savedTracksIds = [...new Set([...state.savedTracksIds, payload])];
    },
  },
});

export const {
  getUser,
  setToken,
  setUserPlayList,
  getRecenlyPlayedTracks,
  getRecentAlbums,
  getSingleAlbum,
  getFeaturedPlaylists,
  getSearchPlaylists,
  getCategories,
  getCategoryPlaylists,
  getSinglePlayLists,
  setIsLoading,
  getSearchedItems,
  getSearchQuery,
  getArtist,
  getArtistAlbums,
  getrelatedArtists,
  getRecentSearches,
  removeRecentSearches,
  getSavedTracksIds,
} = DataLayerSlice.actions;
export default DataLayerSlice.reducer;
