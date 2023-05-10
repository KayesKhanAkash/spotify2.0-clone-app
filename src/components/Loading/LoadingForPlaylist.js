import React from "react";
import {
  LoadingForHeading,
  LoadingForImages,
  LoadingForItems,
  LoadingForNav,
} from "./LoadingItems";

const LoadingForPlaylist = () => {
  return (
    <div className="loadingfor-playlist px-5">
      <div className="flex gap-5 mt-40 flex-col items-center md:flex-row">
        <div className="h-40 w-[160px]">
          <LoadingForImages />
        </div>
        <div className="w-full py-2 flex flex-col items-start mt-5 md:w-3/4 md:mt-0">
          <div className="w-[100px]">
            <LoadingForHeading />
          </div>
          <div className="mt-6 w-full">
            <LoadingForNav />
          </div>
          <div className="mt-6 w-2/4">
            <LoadingForHeading />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <LoadingForNav />
      </div>

      <div className="flex flex-col gap-4 mt-12">
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
        <LoadingForItems />
      </div>
    </div>
  );
};

export default LoadingForPlaylist;
