import { createSlice } from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
  name: "player",

  initialState: {
    isPlaying: false,
    currentPlaylist: null,
    currentSong: null,
    isScroll: false,
    isActive: false,
    currentInx: 0,
    hexColorCode: null,
    isMobilePlayerOpen: false,
    mobilePlayerColor: "",
    playerBodyScrollY: 0,
  },

  reducers: {
    setPlaying: (state, { payload }) => {
      state.isPlaying = payload;
    },

    handleScroll: (state, { payload }) => {
      state.isScroll = payload;
    },

    handleCurrentPlaylist: (state, { payload }) => {
      const { currentPlaylist, currentSong, index, images } = payload;

      if (currentSong?.track) {
        state.currentSong = { ...currentSong.track, images };
      } else if (currentSong) {
        state.currentSong = { ...currentSong, images };
      }

      state.currentPlaylist = currentPlaylist;
      state.currentInx = index;
    },

    getCurrentPlaylist: (state, { payload }) => {
      state.currentPlaylist = payload;
    },

    getCurrentSong: (state, { payload }) => {
      if (payload?.item?.track) {
        state.currentSong = payload.item.track;
      } else if (payload?.item) {
        state.currentSong = payload.item;
      }
      state.currentInx = payload.index;
    },

    nextSong: (state, { payload }) => {
      if (state.currentPlaylist?.items[payload]?.track) {
        state.currentSong = state.currentPlaylist?.items[payload].track;
      } else if (state.currentPlaylist?.items[payload]) {
        state.currentSong = state.currentPlaylist.items[payload];
      }

      state.currentInx = payload;
    },

    prevSong: (state, { payload }) => {
      if (state.currentPlaylist?.items[payload]?.track) {
        state.currentSong = state.currentPlaylist?.items[payload]?.track;
      } else if (state.currentPlaylist?.items[payload]) {
        state.currentSong = state.currentPlaylist.items[payload];
      }

      state.currentInx = payload;
    },
    getHexColorCode: (state, { payload }) => {
      state.hexColorCode = payload;
    },
    setMobilePlayerOpen: (state, { payload }) => {
      state.isMobilePlayerOpen = payload;
    },
    setMobilePlayerColor: (state, { payload }) => {
      state.mobilePlayerColor = payload;
    },
    setPlayerBodyScroll: (state, { payload }) => {
      state.playerBodyScrollY = payload;
    },
  },
});

export const {
  setPlaying,
  handleScroll,
  getCurrentPlaylist,
  getCurrentSong,
  nextSong,
  prevSong,
  getHexColorCode,
  handleCurrentPlaylist,
  setMobilePlayerOpen,
  setMobilePlayerColor,
  setPlayerBodyScroll,
} = PlayerSlice.actions;
export default PlayerSlice.reducer;
