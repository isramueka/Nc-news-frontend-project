import React, { useState, useEffect } from "react";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import { useParams, useSearchParams } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  useEffect(() => {
    setError(null);
    getArticles({ topic: topic_id, sort_by: sortBy, order: order })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error fetching articles");
        setIsLoading(false);
      });
  }, [topic_id, sortBy, order]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setSearchParams({ sort_by: e.target.value, order });
  };

  const handleOrderChange = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="article-list-container">
      <div className="sort-controls">
        <label htmlFor="sort-by">
          <strong>Sort by:</strong>
        </label>
        <select id="sort-by" value={sortBy} onChange={handleSortByChange}>
          <option value="created_at">Date</option>
          <option value="comments_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="order">
          {" "}
          <strong>Order: </strong>
        </label>
        <button onClick={handleOrderChange}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
