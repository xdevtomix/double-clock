import React from 'react';

export default function App() {

  return (
    <div data-component="app">
      <section className="clock container">
        <div className="clock__container grid">
          <div className="clock__content grid">
            <div className="clock__circle">
              <span className="clock__twelve"></span>
              <span className="clock__three"></span>
              <span className="clock__six"></span>
              <span className="clock__nine"></span>

              <div className="clock__rounder"></div>
              <div className="clock__hour" id="clock-hour"></div>
              <div className="clock__minutes" id="clock-minutes"></div>
              <div className="clock__seconds" id="clock-seconds"></div>

              <div className="clock__theme">
                <i className='bx bxs-moon' id="theme-button"></i>
              </div>
            </div>

            <div>
              <div className="clock__text">
                <div className="clock__text-hour" id="text-hour"></div>
                <div className="clock__text-minutes" id="text-minutes"></div>
                <div className="clock__text-ampm" id="text-ampm"></div>
              </div>

              <div className="clock__date">
                <span id="date-day"></span>
                <span id="date-month"></span>
                <span id="date-year"></span>
              </div>
            </div>
          </div>

          <a href="https://www.youtube.com/c/Bedimcode/" target="_blank" className="clock__logo">Bedimcode</a>
        </div>
      </section>
    </div>
  )
}