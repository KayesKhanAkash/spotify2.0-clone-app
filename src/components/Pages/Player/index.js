import React from "react";
import Sidebar from "./Sidebar";
import PlayerBody from "./PlayerBody";
import Footer from "../../Layout/Footer/Footer";

const Player = () => {
  return (
    <div className="player text-text_color">
      <div className="player-container flex">
        <Sidebar />
        <PlayerBody />
      </div>
      <Footer />
    </div>
  );
};

export default Player;
