import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingMenu from "./LandingMenu";
import NewGame from "./NewGame";


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
      path: "/play",
      element: <NewGame/>
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