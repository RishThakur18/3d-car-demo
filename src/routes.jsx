import * as React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import CarShowMain from "./theme/carshow/carShowMain";
import Globe from "./theme/3dglobe/globe";
 

export const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<CarShowMain />}>
    </Route>
  )
);

