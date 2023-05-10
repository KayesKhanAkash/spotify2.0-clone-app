import React, { useState } from "react";
import MusicCart from "../Home/MusicCart";
import { Link } from "react-router-dom";

const Discography = ({ artistAlbums, title }) => {
  const [currIdx, setCurrIdx] = useState("Popular releases");

  let currAlbum;

  const buttons = artistAlbums?.items?.map((item) => {
    return item?.album_type;
  });

  const uniqueBtn = ["Popular releases", ...new Set(buttons)];

  const newReleases = artistAlbums?.items
    ?.filter((item) => {
      const date = new Date(item?.release_date);
      const year = date.getFullYear();

      return year > 2020;
    })
    .sort((a, b) => {
      return (
        new Date(b.release_date).getFullYear() -
        new Date(a.release_date).getFullYear()
      );
    });

  const handleClick = (index) => {
    setCurrIdx(index !== currIdx ? index : index);
  };

  uniqueBtn.forEach((item, index) => {
    if (index === 0) {
      currAlbum = newReleases;
    } else if (currIdx === item) {
      currAlbum = artistAlbums?.items?.filter((album) => {
        return album?.album_type === item;
      });
    }
  });

  return (
    <div className="discography px-6 mt-10 text-sm">
      <div className="flex justify-between items-center">
        <h2 className="hover:underline">
          <Link to={"discography/all"}>{title}</Link>
        </h2>
        <Link to="discography/all" className="hover:underline">
          Show all
        </Link>
      </div>
      <div className="nav">
        <ul className="flex gap-4 mt-5 flex-wrap">
          {uniqueBtn.map((item) => (
            <button
              key={item}
              type="button"
              className={`${
                item === currIdx
                  ? "bg-white text-black"
                  : "bg-[#2f2f2f] text-white"
              } px-4 py-1 rounded-3xl hover:scale-105 transition-transform capitalize`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </ul>
      </div>

      {/* albums */}

      <div className="grid gap-5 mt-10 grid-cols-2 mb-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9">
        {currAlbum?.slice(0, 4).map((item) => (
          <div key={item?.id}>
            <MusicCart
              img={item?.images[1]?.url}
              title={item?.name}
              albumId={item?.id}
              year={new Date(item?.release_date).getFullYear()}
              type={item?.album_type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discography;
