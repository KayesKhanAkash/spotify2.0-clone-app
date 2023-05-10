import { configureStore } from "@reduxjs/toolkit";
import DataLayerSlice from "./Slice/DataLayerSlice";
import PlayerSlice from "./Slice/PlayerSlice";

export const store = configureStore({
  reducer: {
    DataLayerSlice,
    PlayerSlice,
  },
});
