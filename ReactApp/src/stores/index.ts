// Erlend

import { kStore } from "./kStore";
import { create } from "mobx-persist";

interface Stores {
  [key: string]: any;
}

export const stores: Stores = {
  kStore: new kStore(),
};

// Persist mobx
const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

Object.keys(stores).map((val) => hydrate(val, stores[val]));
