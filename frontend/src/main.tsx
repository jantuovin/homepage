// @ts-nocheck
import reactDOM from "react-dom/client";

import { App } from "./App";

(async () => {
  if (CSS["paintWorklet"] === undefined) {
    await import("https://unpkg.com/css-paint-polyfill");
  }
  CSS.paintWorklet.addModule("./css-worklets/static-noise.js");
})();

const root = reactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
