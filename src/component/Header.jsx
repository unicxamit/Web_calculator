import React from 'react'
import '../css/Header.css'

import header from  "../assets/header.jpg"
export default function Header() {
  return (
    <header className="app-header-startup">
      {/* This wrapper manages the side-by-side layout */}
      <div className="header-flex-container">
        {/* Image on the left */}
        <div className="header-image-wrapper">
          <img src={header} alt="Startup Header" className="header-main-image " />
        </div>

        {/* Text content on the right */}
        <div className="header-text-content">
          <h1 className="header-title-startup">Build Your Startup Foundation</h1>
          <p className="header-tagline-startup">Expert Guidance. Seamless Setup. Accelerated Growth.</p>
          <button className="header-cta-button-startup">
            Launch Your Venture Today
          </button>
        </div>
      </div>
    </header>
  )
}
