import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {matchPath} from "react-router-dom";
import PlayKvisObserver from "./components/playKvis/PlayKvis";
import EnterCodeObserver from "./components/enterCode/EnterCode";

test('defined paths should be accessible', () => {
  render(<App />);

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

test("should display 404 when not valid path", () => {
  const invalidPathMatch = matchPath("/invalidPath", {
    path: "/invalidPath",
    children: <h1>404</h1>
  })

  expect(invalidPathMatch).toBeTruthy();
})
