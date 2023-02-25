import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingMenu from './LandingMenu/LandingMenu.js';
import Game from './Game/Game.js';


const tbd = (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  alignItems: 'center'
  }}>
    <h1>TBD</h1>
  </div>
);
const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingMenu/>
    },
    {
      path: "/new-game",
      element: <Game/>
    },
    {
      path: "/stats",
      element: tbd
    },
    {
      path: "/settings",
      element: tbd
    },
    {
      path: "/help",
      element: tbd
    },
  ]);

export default router;