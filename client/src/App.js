import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav";
import "./App.css";


function App() {
  return (
    <>
      <Router>
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>

          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
