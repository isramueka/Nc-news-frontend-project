import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </div>
  );
};

export default App;
