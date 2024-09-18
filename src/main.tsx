import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import posthog from "posthog-js";

posthog.init("phc_OTgMmbM2VK6ovulBfEmABYtkWH2DFy4ey3zevORoNyb", {
  api_host: "https://us.i.posthog.com",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
