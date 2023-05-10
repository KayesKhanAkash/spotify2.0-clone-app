import React from "react";
import { LoadingForHeading, LoadingForTrack } from "./LoadingItems";

const LoadingCategory = () => {
  return (
    <div className="loading-category px-6 pt-20">
      <div className="my-8">
        <div className="w-40">
          <LoadingForHeading />
        </div>
        <div className="grid gap-5 mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
        </div>
      </div>{" "}
      <div className="my-8">
        <div className="w-40">
          <LoadingForHeading />
        </div>
        <div className="grid gap-5 mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
        </div>
      </div>{" "}
      <div className="my-8">
        <div className="w-40">
          <LoadingForHeading />
        </div>
        <div className="grid gap-5 mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
        </div>
      </div>{" "}
      <div className="my-8">
        <div className="w-40">
          <LoadingForHeading />
        </div>
        <div className="grid gap-5 mt-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
          <LoadingForTrack />
        </div>
      </div>
    </div>
  );
};

export default LoadingCategory;
