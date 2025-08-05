import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CounterPage from "./pages/CounterPage";
import FormPage from "./pages/FormPage";
import ShopPage from "./pages/ShopPage";
import ToDoList from "./pages/ToDoListPage";
import ChatPage from "./pages/ChatPage";
import TranslatorPage from "./pages/TranslatorPage";
import DictionaryPage from "./pages/DictionaryPage";
import MultiChoiceGamePage from "./pages/MultiChoiceGamePage";
import Leaderboard from "./pages/LeaderboardPage";

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

        <a href="/translator">Translator</a>

        <a href="/dictionary">Dictionary</a>

        <a href="/multichoicegame">Multi Choice Game</a>

        <a href="/leaderboard">Leaderboard</a>
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<ShopPage />} />

          <Route path="/todo" element={<ToDoList />} />

          <Route path="/counter" element={<CounterPage />} />

          <Route path="/form" element={<FormPage />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="/translator" element={<TranslatorPage />} />

          <Route path="/dictionary" element={<DictionaryPage />} />

          <Route path="/multichoicegame" element={<MultiChoiceGamePage />} />

          <Route path="/leaderboard" element={<Leaderboard />} />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
