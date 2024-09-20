import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

const TopicPage = () => {
  const { topic_id } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setError(null);
    getArticles({ sort_by: sortBy, order })
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
  }, [topic_id, sortBy, order]);

  const handleSortChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order });
  };

  const handleOrderChange = (e) => {
    setSearchParams({ sort_by: sortBy, order: e.target.value });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="topic-page">
      <section className="header2">
        <div className="sorting-controls">
          <label htmlFor="sort"> Sort by: </label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="comments_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          <label htmlFor="order"> Order: </label>
          <select id="order" value={order} onChange={handleOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <h2>Articles on {topic_id} </h2>
      </section>

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
