import React from "react";
import { styles } from "../../../Utils/commonStyles";

const LoadingForNav = () => {
  return (
    <div className="rounded-full h-12 w-[80%] bg-gray-800 overflow-hidden">
      <div className="w-full h-full loadingAnim"></div>
    </div>
  );
};

const LoadingForItems = () => {
  return (
    <div className="flex gap-3 items-center justify-between bg-[#181818] w-full py-2 px-3">
      <div className="h-10 w-8 min-w-[32px] bg-gray-800 overflow-hidden">
        <div className="w-full h-full loadingAnim"></div>
      </div>
      <div className="flex flex-col gap-3 flex-[1] md:flex-[0.6]">
        <div className="rounded-full h-3 w-[150px] bg-gray-800 overflow-hidden">
          <div className="w-full h-full loadingAnim"></div>
        </div>
        <div className="rounded-full h-3 w-[300px] bg-gray-800 overflow-hidden">
          <div className="w-full h-full loadingAnim"></div>
        </div>
      </div>
      <div className="flex-[0.4] justify-end hidden md:flex">
        <div className="rounded-full h-3 w-[100px] bg-gray-800 overflow-hidden">
          <div className="w-full h-full loadingAnim"></div>
        </div>
      </div>
    </div>
  );
};

const LoadingForItems2 = () => {
  return (
    <div className="flex gap-3 items-center bg-[#181818] w-full py-2 px-3">
      <div className="h-10 w-8 min-w-[32px] bg-gray-800 overflow-hidden">
        <div className="w-full h-full loadingAnim"></div>
      </div>
      <div className="rounded-full h-6 w-full bg-gray-800 overflow-hidden">
        <div className="w-full h-full loadingAnim"></div>
      </div>
    </div>
  );
};

const LoadingForHeading = () => {
  return (
    <div className="rounded-full h-6 w-full bg-gray-800 overflow-hidden">
      <div className="w-full h-full loadingAnim"></div>
    </div>
  );
};

const LoadingForTrack = () => {
  return (
    <div className="bg-[#181818] w-full p-3">
      <div className="w-full h-40 bg-gray-800 overflow-hidden">
        <div className="w-full h-full loadingAnim"></div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="w-1/2">
          <LoadingForHeading />
        </div>
        <div className="w-full">
          <LoadingForHeading />
        </div>
      </div>
    </div>
  );
};

const LoadingForImages = () => {
  return (
    <div className="w-full h-full bg-gray-800 overflow-hidden">
      <div className="w-full h-full loadingAnim"></div>
    </div>
  );
};

const LoadingHeroArea = () => {
  return (
    <div className="flex gap-5 mt-40">
      <div className="h-40 w-1/4">
        <LoadingForImages />
      </div>
      <div className="w-3/4 py-2">
        <div className="w-[100px]">
          <LoadingForHeading />
        </div>
        <div className="mt-6">
          <LoadingForNav />
        </div>
        <div className="mt-6 w-2/4">
          <LoadingForHeading />
        </div>
      </div>
    </div>
  );
};

export {
  LoadingForNav,
  LoadingForItems,
  LoadingForHeading,
  LoadingForTrack,
  LoadingForImages,
  LoadingHeroArea,
  LoadingForItems2,
};
