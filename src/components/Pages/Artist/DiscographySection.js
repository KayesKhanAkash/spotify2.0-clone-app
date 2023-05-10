import React, { useRef, useState } from "react";
import { AiFillCaretDown, AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
import MusicCart from "../Home/MusicCart";
import { clickToClose } from "../../Helper/Functions";

const DiscographySection = () => {
  const { artist, artistAlbums } = useSelector((state) => state.DataLayerSlice);
  const [currBtn, setCurrBtn] = useState("All");
  const [show, setShow] = useState(false);

  const sectionRef = useRef(null);

  let currAlbum;

  const buttons = artistAlbums?.items?.map((item) => {
    return item?.album_type;
  });

  const uniqueBtn = ["All", ...new Set(buttons)];

  const handleClick = (btn) => {
    setCurrBtn(btn !== currBtn ? btn : btn);
  };

  uniqueBtn.forEach((item) => {
    if (item === "All") {
      currAlbum = artistAlbums?.items;
    } else if (currBtn === item) {
      currAlbum = artistAlbums?.items?.filter((album) => {
        return album?.album_type === item;
      });
    }
  });

  return (
    <div className="discography-section mt-20 px-6">
      <div className="flex justify-between items-center">
        <h2>{artist?.name}</h2>
        <div className="sectionBtn relative" ref={sectionRef}>
          <button
            type="button"
            className={`${
              show ? "text-white" : "text-text_color"
            } dropBtn flex gap-1 items-center hover:text-white`}
            onClick={() =>
              clickToClose(show, setShow, sectionRef, ".sectionBtn", ".dropBtn")
            }
          >
            <span className="capitalize">{currBtn}</span>
            <AiFillCaretDown className={show ? "rotate-180" : "rotate-0"} />
          </button>
          <div
            className={`${
              show ? "mt-0 opacity-100 visible" : "invisible opacity-0 mt-5"
            } drop absolute top-[130%] -left-[100px] z-20 bg-[#282828] w-[130px] flex flex-col`}
          >
            {uniqueBtn?.map((btn) => (
              <button
                key={btn}
                type="button"
                className={`${
                  currBtn === btn ? "text-primary" : "text-gray-200"
                } flex justify-between capitalize hover:bg-[#393939] text-left py-2 px-4 text-sm`}
                onClick={() => handleClick(btn)}
              >
                <span>{btn}</span>
                <AiOutlineCheck
                  className={`${currBtn === btn ? "block" : "hidden"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* albums */}
      <div className="grid gap-5 mt-10 grid-cols-2 mb-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9">
        {currAlbum?.map((item) => (
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

export default DiscographySection;
