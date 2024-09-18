import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import CommentList from "./CommentList";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching article");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p>
        <strong>By:</strong> {article.author}
      </p>
      <p>{article.body}</p>
      <p>
        <strong>Votes:</strong> {article.votes} &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Comments:</strong>
        {article.comments_count}
      </p>
      <CommentList article_id={article_id} />
    </div>
  );
};

export default ArticlePage;
