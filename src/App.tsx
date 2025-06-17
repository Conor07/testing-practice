import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CounterPage from "./pages/CounterPage";
import FormPage from "./pages/FormPage";
import ShopPage from "./pages/ShopPage";
import ToDoList from "./pages/ToDoListPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <nav className="MainNav">
        <h1>Testing Practice</h1>

        <a href="/">Home</a>

        <a href="/shop">Shop</a>

        <a href="/todo">To Do List</a>

        <a href="/form">Form</a>

        <a href="/counter">Counter</a>

        <a href="/chat">Chat</a>
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<ShopPage />} />

          <Route path="/todo" element={<ToDoList />} />

          <Route path="/counter" element={<CounterPage />} />

          <Route path="/form" element={<FormPage />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
