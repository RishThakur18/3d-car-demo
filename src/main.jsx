import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { mainRouter } from './routes';
import CarShowMain from "./theme/carshow/carShowMain";

import "./main.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CarShowMain />
  </React.StrictMode>,
)
