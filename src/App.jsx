import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import TopicList from "./components/TopicList";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Header />
        <main>
          <aside className="topic-list-container">
            <TopicList />
          </aside>
          <div className="article-list-container">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/articles/:article_id" element={<ArticlePage />} />
              <Route path="/topics/:topic_id" element={<ArticleList />} />
            </Routes>
          </div>
        </main>
      </div>
    </UserProvider>
  );
};

export default App;
