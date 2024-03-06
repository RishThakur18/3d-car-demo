import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { mainRouter } from './routes';

import "./main.css";
import { RouterProvider } from 'react-router-dom';
import { Ground } from './theme/carshow/components/ground';
import CarShowMain from './theme/carshow/carShowMain';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <RouterProvider router={mainRouter} /> */}
      <CarShowMain/>
  </React.StrictMode>,
)
