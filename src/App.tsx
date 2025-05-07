import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CounterPage from "./pages/CounterPage";
import FormPage from "./pages/FormPage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <div className="App">
      <nav className="MainNav">
        <h1>Testing Practice</h1>

        <a href="/">Home</a>

        <a href="/shop">Shop</a>

        <a href="/form">Form</a>

        <a href="/counter">Counter</a>
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<ShopPage />} />

          <Route path="/counter" element={<CounterPage />} />

          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
