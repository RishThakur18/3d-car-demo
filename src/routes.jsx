import * as React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import CarShowMain from "./theme/carshow/carShowMain";
 

export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" index element={<CarShowMain />} />
    </Route>
  )
);

