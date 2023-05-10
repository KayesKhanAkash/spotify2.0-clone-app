import React from "react";
import {
  LoadingForHeading,
  LoadingForItems2,
  LoadingForNav,
  LoadingForTrack,
} from "./LoadingItems";

const LoadingHome = () => {
  return (
    <div className="loading-home mt-7 px-4">
      <LoadingForNav />
      <div className="flex gap-4 mt-10">
        <div className="w-1/2 flex flex-col gap-4">
          <LoadingForItems2 />
          <LoadingForItems2 />
          <LoadingForItems2 />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <LoadingForItems2 />
          <LoadingForItems2 />
          <LoadingForItems2 />
        </div>
      </div>
      <div className="mt-10 w-[200px]">
        <LoadingForHeading />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
      </div>
      <div className="mt-10 w-[200px]">
        <LoadingForHeading />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
      </div>
      <div className="mt-10 w-[200px]">
        <LoadingForHeading />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
      </div>
      <div className="mt-10 w-[200px]">
        <LoadingForHeading />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
      </div>
      <div className="mt-10 w-[200px]">
        <LoadingForHeading />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
      </div>
      <div className="mt-10 w-[200px]">
        <LoadingForHeading />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-4">
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
        <LoadingForTrack />
      </div>
    </div>
  );
};

export default LoadingHome;
