import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
};

export default App;
