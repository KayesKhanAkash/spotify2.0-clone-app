import React from "react";

const PlayingAnim = () => {
  return (
    <div className="playingAnim flex gap-[1px] h-5 overflow-hidden">
      <div className="w-[3px] h-full bg-primary anim1"></div>
      <div className="w-[3px] h-full bg-primary anim2"></div>
      <div className="w-[3px] h-full bg-primary anim3"></div>
      <div className="w-[3px] h-full bg-primary anim4"></div>
    </div>
  );
};

export default PlayingAnim;
