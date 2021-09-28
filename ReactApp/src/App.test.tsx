import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {matchPath} from "react-router-dom";

test('renders learn react link', () => {
  render(<App />);

  const defaultMatch = matchPath("/", {
    path: "/",
    exact: true,
    strict: false
  })
  const kvisMatch = matchPath("/kvis", {
    path: "/kvis",
    exact: true,
    strict: false
  })

  expect(defaultMatch).toBeTruthy()
  expect(kvisMatch).toBeTruthy()
});
