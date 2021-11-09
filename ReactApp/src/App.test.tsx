import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {matchPath} from "react-router-dom";
import PlayKvisObserver from "./components/playKvis/PlayKvis";
import EnterCodeObserver from "./components/enterCode/EnterCode";
import {act} from "react-dom/test-utils";

it('defined paths should be accessible', () => {
  
  const defaultMatch = matchPath("/", {
    path: "/",
    exact: true,
    strict: false,
    children: <EnterCodeObserver/>
  })

  const playKvisMatch = matchPath("/play-kvis", {
    path: "/play-kvis",
    exact: true,
    strict: false,
    children: <PlayKvisObserver/>
  })

  expect(defaultMatch).toBeTruthy();
  expect(playKvisMatch).toBeTruthy();
});

it("should display 404 when not valid path", () => {
  const invalidPathMatch = matchPath("/invalidPath", {
    path: "/invalidPath",
    children: <h1>404</h1>
  })

  expect(invalidPathMatch).toBeTruthy();
})
