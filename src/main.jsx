import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { mainRouter } from './routes';

import "./styles/main.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={mainRouter} />
  </React.StrictMode>,
)
