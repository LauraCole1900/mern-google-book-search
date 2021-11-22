import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav";
import { LoginPage, SavedPage, SearchPage, SignupPage } from "./pages"
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
            <Route exact path="/" element={<SearchPage />} />
            <Route exact path="/my_books" element={<SavedPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
