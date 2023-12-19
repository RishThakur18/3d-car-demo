import * as React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LandingPage from "./pages/LandingPage";

export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" index element={<LandingPage />} />
    </Route>
  )
);

