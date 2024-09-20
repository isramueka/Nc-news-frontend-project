import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const {
    title,
    author,
    votes,
    comments_count,
    article_img_url,
    topic,
    article_id,
  } = article;

  return (
    <div className="article-card">
      <h2>
        <Link to={`/articles/${article_id}`}>{title}</Link>
      </h2>
      <img src={article_img_url} alt={title} />
      <p>
        <strong>{topic}</strong>
      </p>
      <p>By: {author}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comments_count}</p>
    </div>
  );
};

export default ArticleCard;
