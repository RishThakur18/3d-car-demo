import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import MyThree from './components/three';
import GlowCard from './components/glowCard';

function App() {

  useEffect(() => {
    const boxWrapper = document.querySelector(".card-wrapper");
    const boxes = document.querySelectorAll(".box");

    boxWrapper.addEventListener("pointermove", (e) => {
      boxes.forEach((box) => {
        const rect = box.getBoundingClientRect();
        box.style.setProperty("--x", e.clientX - rect.left);
        box.style.setProperty("--y", e.clientY - rect.top);
      });
    });
  }, []);


  return (
    <div className="main-wrapper">
      <div className="as">
        <h1 className="neon" data-text="U">
          <span className="flicker-slow">R</span>
          <span className="flicker-fast">S</span>
        </h1>
        <div className="card-wrapper">
          <GlowCard />
          <GlowCard />
          <GlowCard />
          <GlowCard />
        </div>
      </div>
      <div className="model3d-wrapper">
        <MyThree />
      </div>
    </div>

  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)