import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import { useDispatch } from "react-redux";
import {
  handleScroll,
  setPlayerBodyScroll,
} from "../../../Redux/Slice/PlayerSlice";
import MobileNav from "../../Layout/MobileNav/MobileNav";
import PlayerFooter from "../../Layout/PlayerFooter/PlayerFooter";

const PlayerBody = () => {
  const playerBody = useRef(null);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    playerBody.current.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const player = playerBody.current;

    player.addEventListener("scroll", () => {
      dispatch(setPlayerBodyScroll(player.scrollTop));
      if (player.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        dispatch(handleScroll(true));
      } else {
        dispatch(handleScroll(false));
      }
    });
    return () => {};
  }, []);

  // dispatch(handleScroll(playerBody.current));

  return (
    <div
      className="player-body relative w-full bg-player_bg text-text_color overflow-auto max-h-[120vh] md:w-10/12"
      ref={playerBody}
    >
      <Header />
      <div className="max-w-[110rem]">
        <Outlet />
        <MobileNav />
      </div>
      <PlayerFooter />
    </div>
  );
};

export default PlayerBody;
