import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

const TopicPage = () => {
  const { topic_id } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getArticles()
      .then((data) => {
        const filteredArticles = data.articles.filter(
          (article) => article.topic === topic_id
        );
        setArticles(filteredArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching articles for this topic");
        setIsLoading(false);
      });
  }, [topic_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="topic-page">
      <h2>Articles on {topic_id}</h2>
      <section className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </section>
      <div>
        <Link to="/">
          <button>Back ⇦</button>
        </Link>
      </div>
    </div>
  );
};

export default TopicPage;
