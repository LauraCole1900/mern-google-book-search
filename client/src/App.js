import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav";
import { SearchPage } from "./pages"
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
            <Route path="/" element={<SearchPage />}>
              <Route path="search" element={<SearchPage />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
