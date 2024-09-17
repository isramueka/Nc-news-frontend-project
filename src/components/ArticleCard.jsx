import React from "react";

const ArticleCard = ({ article }) => {
  const { title, author, votes, comments_count, article_img_url } = article;

  return (
    <div className="article-card">
      <h2>{title}</h2>
      <img src={article_img_url} />
      <p>By: {author}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comments_count}</p>
    </div>
  );
};

export default ArticleCard;
